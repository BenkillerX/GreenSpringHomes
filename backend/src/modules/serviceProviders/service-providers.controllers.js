import cloudinary from "../../config/cloudinary.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";
import ServiceProviderProfile from "../models/ServiceProviderProfile.js";

export async function getServiceProviderProfile(req, res) {
  try {
    const profile = await ServiceProviderProfile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Service provider profile not found.",
      });
    }

    return res.status(200).json({
      message: "Service provider profile retrieved successfully.",
      profile,
    });

  } catch (error) {
    console.error(
      "GET SERVICE PROVIDER PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      message: "An error occurred while retrieving your profile.",
    });
  }
}


export async function updateServiceProviderProfile(req, res) {
  let uploadedImage = null;

  try {
    const userId = req.user.id;

    const { service, description, experience, location } = req.body;
    
    // Find the authenticated provider's profile
    const profile = await ServiceProviderProfile.findOne({
      user: userId
    });

    if (!profile) {
      return res.status(404).json({
        message: "Service provider profile not found."
      });
    }

    // Update text fields only when provided
    if (service !== undefined) {
      if (!service.trim()) {
        return res.status(400).json({
          message: "Service cannot be empty."
        });
      }

      profile.service = service.trim();
    }

    if (description !== undefined) {
      if (!description.trim()) {
        return res.status(400).json({
          message: "Description cannot be empty."
        });
      }

      profile.description = description.trim();
    }

    if (location !== undefined) {
      if (!location.trim()) {
        return res.status(400).json({
          message: "Location cannot be empty."
        });
      }

      profile.location = location.trim();
    }

    if (experience !== undefined) {
      const years = Number(experience);

      if (!Number.isFinite(years) || years < 0) {
        return res.status(400).json({
          message: "Please provide a valid experience value."
        });
      }

      profile.experience = years;
    }

    // Upload replacement image if provided
    if (req.file) {
      uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "greenspringhomes/service-providers"
      );

      const oldPublicId = profile.image?.publicId;

      profile.image = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id
      };

      await profile.save();

      // Delete old image only after the new profile has been saved
      if (oldPublicId) {
        try {
          await cloudinary.uploader.destroy(oldPublicId);
        } catch (deleteError) {
          console.error("OLD PROFILE IMAGE DELETION ERROR:", deleteError);
        }
      }
    } else {
      await profile.save();
    }

    return res.status(200).json({
      message: "Service provider profile updated successfully.",
      profile
    });

  } catch (error) {
    console.error("UPDATE SERVICE PROVIDER PROFILE ERROR:", error);

    // Clean up a newly uploaded image if the update fails
    if (uploadedImage?.public_id) {
      try {
        await cloudinary.uploader.destroy(uploadedImage.public_id);
      } catch (deleteError) {
        console.error("NEW IMAGE CLEANUP ERROR:", deleteError);
      }
    }

    return res.status(500).json({
      message: "Unable to update service provider profile."
    });
  }
}