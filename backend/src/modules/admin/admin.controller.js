import Property from "../models/Property.js";
import User from "../models/Users.js";

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