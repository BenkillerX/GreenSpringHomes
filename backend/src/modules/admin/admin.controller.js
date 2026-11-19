import Property from "../models/Property.js";
import ServiceProviderProfile from "../models/ServiceProviderProfile.js";
import User from "../models/Users.js";
import mongoose from "mongoose";
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching user statistics:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user statistics",
    });
  }
};


export const getRecentProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("owner", "firstname lastname")
      .select("title price location listingType verificationStatus createdAt");

    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    console.error("Error fetching recent properties:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recent properties",
    });
  }
};

export const getRecentUsers = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("firstname lastname email role createdAt");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching recent users:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recent users",
    });
  }
};

export const getVerificationSummary = async (req, res) => {
  try {
    const summary = await Property.aggregate([
      {
        $group: {
          _id: "$verificationStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    const counts = {
      pending: 0,
      verified: 0,
      rejected: 0,
    };

    summary.forEach((item) => {
      if (item._id in counts) {
        counts[item._id] = item.count;
      }
    });

    res.status(200).json({
      success: true,
      summary: {
        pending: counts.pending,
        verified: counts.verified,
        rejected: counts.rejected,
        total:
          counts.pending +
          counts.verified +
          counts.rejected,
      },
    });
  } catch (error) {
    console.error("Error fetching verification summary:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch verification summary",
    });
  }
};

export const getUserStatsMain = async (req, res) => {
  try {
    const [stats] = await User.aggregate([
      {
        $group: {
          _id: null,

          totalUsers: {
            $sum: 1,
          },

          totalTenants: {
            $sum: {
              $cond: [{ $eq: ["$role", "tenant"] }, 1, 0],
            },
          },

          totalOwners: {
            $sum: {
              $cond: [{ $eq: ["$role", "propertyOwner"] }, 1, 0],
            },
          },

          suspendedUsers: {
            $sum: {
              $cond: [{ $eq: ["$isActive", false] }, 1, 0],
            },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: stats || {
        totalUsers: 0,
        totalTenants: 0,
        totalOwners: 0,
        suspendedUsers: 0,
      },
    });
  } catch (error) {
    console.error("Error fetching user statistics:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user statistics",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select(
        "firstname lastname email role isActive isEmailVerified createdAt"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};


export const getPropertyStats = async (req, res) => {
  try {
    const [
      totalProperties,
      verifiedProperties,
      pendingProperties,
      rejectedProperties,
    ] = await Promise.all([
      Property.countDocuments(),
      Property.countDocuments({ verificationStatus: "verified" }),
      Property.countDocuments({ verificationStatus: "pending" }),
      Property.countDocuments({ verificationStatus: "rejected" }),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalProperties,
        verifiedProperties,
        pendingProperties,
        rejectedProperties,
      },
    });
  } catch (error) {
    console.error("Get property stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve property statistics",
    });
  }
};


export async function getAllProperties(req, res) {
  try {
    const properties = await Property.find()
      .populate("owner", "firstname lastname email")
      .sort({ createdAt: -1 });

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

export async function getPropertyById(req, res) {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const property = await Property.findById(propertyId)
      .populate("owner", "firstname lastname email phoneNumber");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property fetched successfully",
      property,
    });
  } catch (error) {
    console.error("Get property by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch property",
    });
  }
}
export async function updatePropertyVerification(req, res) {
  try {
    const { propertyId } = req.params;
    const { verificationStatus, rejectionReason } = req.body;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const allowedStatuses = ["verified", "rejected"];

    if (!allowedStatuses.includes(verificationStatus)) {
      return res.status(400).json({
        success: false,
        message: "Verification status must be verified or rejected",
      });
    }

    if (
      verificationStatus === "rejected" &&
      (!rejectionReason || !rejectionReason.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "A rejection reason is required",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    property.verificationStatus = verificationStatus;

    if (verificationStatus === "rejected") {
      property.rejectionReason = rejectionReason.trim();
    } else {
      property.rejectionReason = undefined;
    }

    await property.save();

    return res.status(200).json({
      success: true,
      message: `Property ${verificationStatus} successfully`,
      property,
    });
  } catch (error) {
    console.error("Update property verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update property verification",
    });
  }
}
export async function updatePropertyStatus(req, res) {
  try {
    const { propertyId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const allowedStatuses = ["active", "inactive"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be active or inactive",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    property.status = status;

    await property.save();

    return res.status(200).json({
      success: true,
      message: `Property listing ${status} successfully`,
      property,
    });
  } catch (error) {
    console.error("Update property status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update property status",
    });
  }
}

export async function givePromotion(req, res) {
  try {
    const { propertyId } = req.params;
    const { isFeatured, priority } = req.body;

    // Validate property ID
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID.",
      });
    }

    // Validate featured status
    if (typeof isFeatured !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isFeatured must be a boolean.",
      });
    }

    // Validate priority
    if (!Number.isInteger(priority) || priority < 0) {
      return res.status(400).json({
        success: false,
        message: "Priority must be a non-negative whole number.",
      });
    }

    const property = await Property.findByIdAndUpdate(
      propertyId,
      {
        $set: {
          isFeatured,
          priority,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Property promotion updated successfully.",
      property,
    });
  } catch (error) {
    console.error("Give promotion error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update property promotion.",
    });
  }
}

export async function getAllServiceProviders(req, res) {
  try {
    const serviceProviders = await ServiceProviderProfile.find()
      .populate(
        "user",
        "firstname lastname email phoneNumber whatsappNumber isActive isEmailVerified createdAt"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      serviceProviders,
    });
  } catch (error) {
    console.error("Get all service providers error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch service providers.",
    });
  }
}