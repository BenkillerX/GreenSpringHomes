import { SERVICE_PROVIDER_SKILLS } from "../../utils/serviceProviderSkills.js";
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
  let uploadedImage;
  let createdProfile;

  try {
    const userId = req.user.id;

    const { category, service, description, experience, location, phoneNumber, whatsappNumber, contactVisibility, } = req.body;
    console.log("Onboarding request body:", req.body);
console.log("Service value:", service);
console.log("Service type:", typeof service);
    // Validate required fields
    if ( !category?.trim() || !service?.trim() || !description?.trim() || experience === undefined || !location?.trim() || !phoneNumber?.trim() || !whatsappNumber?.trim() ) {
      return res.status(400).json({
        message: "Please provide all required onboarding information.",
      });
    }

    // Validate category
    const approvedSkills = SERVICE_PROVIDER_SKILLS[category.trim()];

    if (!approvedSkills) {
      return res.status(400).json({
        message: "Please select a valid service category.",
      });
    }

    // Validate that the selected skill belongs to the selected category
    if (!approvedSkills.includes(service.trim())) {
      return res.status(400).json({
        message: "The selected service does not belong to this category.",
      });
    }

    // Normalize phone numbers
    const normalizedPhone = phoneNumber.replace(/[\s-]/g, "");
    const normalizedWhatsApp = whatsappNumber.replace(/[\s-]/g, "");

    if (
      !/^\+?[0-9]{10,15}$/.test(normalizedPhone) ||
      !/^\+?[0-9]{10,15}$/.test(normalizedWhatsApp)
    ) {
      return res.status(400).json({
        message: "Please provide valid phone and WhatsApp numbers.",
      });
    }

    const parsedExperience = Number(experience);

    if (
      !Number.isFinite(parsedExperience) ||
      parsedExperience < 0
    ) {
      return res.status(400).json({
        message: "Please provide a valid years of experience value.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a service provider image.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (user.role !== "serviceProvider") {
      return res.status(403).json({
        message: "Only service providers can complete this onboarding.",
      });
    }

    if (user.onboardingCompleted) {
      return res.status(400).json({
        message: "Onboarding has already been completed.",
      });
    }

    // Upload image to Cloudinary
    uploadedImage = await uploadToCloudinary(
      req.file.buffer,
      "greenspringhomes/service-providers"
    );

    const image = {
      url: uploadedImage.secure_url,
      publicId: uploadedImage.public_id,
    };

    // Create service provider profile
    createdProfile = new ServiceProviderProfile({
      user: userId,
      category: category.trim(),
      service: service.trim(),
      description: description.trim(),
      experience: parsedExperience,
      image,
      location: location.trim(),
    });

    await createdProfile.save();

    // Update user's contact information and onboarding status
    user.phoneNumber = normalizedPhone;
    user.whatsappNumber = normalizedWhatsApp;
    user.contactVisibility = contactVisibility === "true";
    user.onboardingCompleted = true;

    await user.save();

    return res.status(200).json({
      message: "Service provider onboarding completed successfully.",
      onboardingCompleted: true,
    });
  } catch (error) {
    console.error("Service provider onboarding error:", error);

    // Remove the profile if it was already created
    if (createdProfile?._id) {
      try {
        await ServiceProviderProfile.findByIdAndDelete(
          createdProfile._id
        );
      } catch (cleanupError) {
        console.error("Profile cleanup error:", cleanupError);
      }
    }

    // Remove uploaded image if onboarding fails after upload
    if (uploadedImage?.public_id) {
      try {
        await cloudinary.uploader.destroy(uploadedImage.public_id);
      } catch (cleanupError) {
        console.error("Cloudinary cleanup error:", cleanupError);
      }
    }

    return res.status(500).json({
      message: "An error occurred while completing onboarding.",
    });
  }
}
