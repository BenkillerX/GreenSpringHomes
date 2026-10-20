import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";
import Property from "../models/Property.js";
import mongoose from "mongoose";
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
    const imageUrls = uploadedImages.map(
      (image) => image.secure_url
    );

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

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    console.error("Get property by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve property",
    });
  }
};