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