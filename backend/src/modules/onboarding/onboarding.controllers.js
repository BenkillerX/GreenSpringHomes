import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";
import PropertyOwnerProfile from "../models/PropertyOwnerProfile.js";
import ServiceProviderProfile from "../models/ServiceProviderProfile.js";
import TenantProfile from "../models/TenantProfile.js";
import User from "../models/Users.js";

export async function completeTenantOnboarding(req, res) {
    try {
        const userId = req.user.id;

        const {
            phone,
            profileImage
        } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        if (user.role !== "tenant") {
            return res.status(403).json({
                message: "Only tenants can complete this onboarding."
            });
        }

        if (user.onboardingCompleted) {
            return res.status(400).json({
                message: "Onboarding has already been completed."
            });
        }

        const tenantProfile = new TenantProfile({
            user: userId,
            phone,
            profileImage
        });

        await tenantProfile.save();

        user.onboardingCompleted = true;
        await user.save();

        return res.status(200).json({
            message: "Tenant onboarding completed successfully.",
            onboardingCompleted: true
        });

    } catch (error) {
        console.error("Tenant onboarding error:", error);

        return res.status(500).json({
            message: "An error occurred while completing onboarding."
        });
    }
}

export async function completePropertyOwnerOnboarding(req, res) {
    try {
        const userId = req.user.id;

        const {
            phone,
            location,
            bio
        } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        if (user.role !== "propertyOwner") {
            return res.status(403).json({
                message: "Only property owners can complete this onboarding."
            });
        }

        if (user.onboardingCompleted) {
            return res.status(400).json({
                message: "Onboarding has already been completed."
            });
        }

        const propertyOwnerProfile = new PropertyOwnerProfile({
            user: userId,
            phone,
            location,
            bio
        });

        await propertyOwnerProfile.save();

        user.onboardingCompleted = true;

        await user.save();

        return res.status(200).json({
            message: "Property owner onboarding completed successfully.",
            onboardingCompleted: true
        });

    } catch (error) {
        console.error("Property owner onboarding error:", error);

        return res.status(500).json({
            message: "An error occurred while completing onboarding."
        });
    }
}

export async function completeServiceProviderOnboarding(req, res) {
  try {
    const userId = req.user.id;
    const { service, description, experience, location } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a service provider image."
      });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadToCloudinary(
      req.file.buffer,
      "greenspringhomes/service-providers"
    );

    const image = {
      url: uploadedImage.secure_url,
      publicId: uploadedImage.public_id
    };

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    if (user.role !== "serviceProvider") {
      return res.status(403).json({
        message: "Only service providers can complete this onboarding."
      });
    }

    if (user.onboardingCompleted) {
      return res.status(400).json({
        message: "Onboarding has already been completed."
      });
    }

    const serviceProviderProfile = new ServiceProviderProfile({
      user: userId,
      image,
      service,
      description,
      experience,
      location
    });

    await serviceProviderProfile.save();

    user.onboardingCompleted = true;
    await user.save();

    return res.status(200).json({
      message: "Service provider onboarding completed successfully.",
      onboardingCompleted: true
    });

  } catch (error) {
    console.error("Service provider onboarding error:", error);

    return res.status(500).json({
      message: "An error occurred while completing onboarding."
    });
  }
}