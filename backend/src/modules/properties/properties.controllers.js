import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";
import Property from "../models/Property.js";
import mongoose from "mongoose";
import { deleteFromCloudinary } from "../../utils/deleteFromCloudinary.js";
export async function addProperty(req, res) {
  try {
    const {
      title,
      description,
      propertyType,
      listingType,
      price,
      bedrooms,
      bathrooms,
      location,
    } = req.body;

    // Make sure at least one image was uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Please upload at least one property image.",
      });
    }

    // Upload all images to Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map((file) =>
        uploadToCloudinary(file.buffer, "greenspringhomes/properties")
      )
    );

    // Extract only the URLs we need
    const imageUrls = uploadedImages.map((image) => ({
    url: image.secure_url,
    publicId: image.public_id,
  }));

    // Create property
    const property = new Property({
      owner: req.user.id,

      title,
      description,
      propertyType,
      listingType,
      price,
      bedrooms,
      bathrooms,

      location,

      images: imageUrls,

      status: "active",
      verificationStatus: "pending",
    });

    await property.save();

    return res.status(201).json({
      message: "Property added successfully.",
      property,
    });

  } catch (error) {
  console.error("ADD PROPERTY ERROR:", error);

  return res.status(500).json({
    message: "Unable to add property.",
    error: error.message,
  });
}
}

export async function getProperties(req, res) {
  try {
    const userId = req.user.id;
    const properties = await Property.find({
      owner: userId
    });

    return res.status(200).json({
      success: true,
      count: properties.length,
      properties
    });

  } catch (error) {
    console.error("Get properties error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get properties"
    });
  }
}
export async function getAllProperties(req, res) {
  try {
    const properties = await Property.find();

    return res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("Get all properties error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get all properties",
    });
  }
}



export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    // Fetch property and populate owner information
    const property = await Property.findById(id).populate(
      "owner",
      "firstname lastname phoneNumber whatsappNumber contactVisibility"
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Convert Mongoose document to plain object
    const propertyData = property.toObject();

    // Protect owner's private contact information
    if (propertyData.owner) {
      const owner = propertyData.owner;

      propertyData.owner = {
        _id: owner._id,
        firstname: owner.firstname,
        lastname: owner.lastname,

        // Only expose contact details if visibility is enabled
        phoneNumber:
          owner.contactVisibility === true
            ? owner.phoneNumber ?? null
            : null,

        whatsappNumber:
          owner.contactVisibility === true
            ? owner.whatsappNumber ?? null
            : null,
      };
    }

    return res.status(200).json({
      success: true,
      property: propertyData,
    });
  } catch (error) {
    console.error("Get property by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve property",
    });
  }
};


export async function deleteProperty(req, res) {
  try {
    const { id } = req.params;

    // Validate property ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid property ID",
      });
    }

    // Find property
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to delete this property",
      });
    }

    const images = property.images || [];

    // Ensure all images have public IDs
    if (images.some((image) => !image.publicId)) {
      return res.status(409).json({
        message: "Some images are missing Cloudinary public IDs",
      });
    }

    // Delete all images from Cloudinary
    const results = await Promise.allSettled(
      images.map((image) =>
        deleteFromCloudinary(image.publicId)
      )
    );

    // Check deletion results
    const failed = results.some(
      (result) =>
        result.status === "rejected" ||
        !["ok", "not found"].includes(result.value?.result)
    );

    if (failed) {
      console.error("CLOUDINARY DELETE RESULTS:", results);

      return res.status(502).json({
        message: "Some property images could not be deleted. Please retry.",
      });
    }

    // Delete property from MongoDB
    await Property.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Property and images deleted successfully",
    });

  } catch (error) {
    console.error("DELETE PROPERTY ERROR:", error);

    return res.status(500).json({
      message: "Unable to delete property",
    });
  }
}


export const searchProperties = async (req, res) => {
  try {
    const { location, propertyType, maxPrice } = req.query;

    const filter = {
      status: "active",
    };

    // Search across location fields
    if (typeof location === "string" && location.trim()) {
      const escapedLocation = location.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const locationRegex = new RegExp(escapedLocation, "i");

      filter.$or = [
        { "location.state": locationRegex },
        { "location.city": locationRegex },
        { "location.area": locationRegex },
        { "location.address": locationRegex },
      ];
    }

    // Filter by property type
    if (typeof propertyType === "string" && propertyType.trim()) {
      filter.propertyType = propertyType.trim().toLowerCase();
    }

    // Filter by maximum budget
    if (maxPrice !== undefined && maxPrice !== "") {
      const price = Number(maxPrice);

      if (!Number.isFinite(price) || price < 0) {
        return res.status(400).json({
          message: "Invalid maximum price",
        });
      }

      filter.price = { $lte: price };
    }

    const properties = await Property.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      message: "Search completed successfully",
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("PROPERTY SEARCH ERROR:", error);

    return res.status(500).json({
      message: "Unable to search properties",
    });
  }
};
