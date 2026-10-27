import mongoose from "mongoose";
import SavedProperty from "../models/SavedProperty.js";
import Property from "../models/Property.js";

// SAVE A PROPERTY
export async function saveProperty(req, res) {
  try {
    const { propertyId } = req.params;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(propertyId)) {
      return res.status(400).json({
        message: "Invalid property ID",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const savedProperty = await SavedProperty.findOneAndUpdate(
      {
        user: userId,
        property: propertyId,
      },
      {
        $setOnInsert: {
          user: userId,
          property: propertyId,
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Property saved successfully",
      savedProperty,
    });
  } catch (error) {
    console.error("SAVE PROPERTY ERROR:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Property already saved",
      });
    }

    return res.status(500).json({
      message: "Unable to save property",
    });
  }
}

// GET ALL SAVED PROPERTIES
export async function getSavedProperties(req, res) {
  try {
    const userId = req.user.id;

    const savedProperties = await SavedProperty.find({
      user: userId,
    })
      .populate("property")
      .sort({ createdAt: -1 });

    // Exclude properties that have been deleted
    const validSavedProperties = savedProperties.filter(
      (saved) => saved.property !== null
    );

    return res.status(200).json({
      message: "Saved properties retrieved successfully",
      count: validSavedProperties.length,
      savedProperties: validSavedProperties,
    });
  } catch (error) {
    console.error("GET SAVED PROPERTIES ERROR:", error);

    return res.status(500).json({
      message: "Unable to retrieve saved properties",
    });
  }
}

// REMOVE A SAVED PROPERTY
export async function removeSavedProperty(req, res) {
  try {
    const { propertyId } = req.params;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(propertyId)) {
      return res.status(400).json({
        message: "Invalid property ID",
      });
    }

    const removedProperty = await SavedProperty.findOneAndDelete({
      user: userId,
      property: propertyId,
    });

    if (!removedProperty) {
      return res.status(404).json({
        message: "Property not found in saved properties",
      });
    }

    return res.status(200).json({
      message: "Property removed from saved properties",
    });
  } catch (error) {
    console.error("REMOVE SAVED PROPERTY ERROR:", error);

    return res.status(500).json({
      message: "Unable to remove saved property",
    });
  }
}

// CHECK WHETHER A PROPERTY IS SAVED
export async function checkSavedProperty(req, res) {
  try {
    const { propertyId } = req.params;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(propertyId)) {
      return res.status(400).json({
        message: "Invalid property ID",
      });
    }

    const savedProperty = await SavedProperty.exists({
      user: userId,
      property: propertyId,
    });

    return res.status(200).json({
      isSaved: Boolean(savedProperty),
    });
  } catch (error) {
    console.error("CHECK SAVED PROPERTY ERROR:", error);

    return res.status(500).json({
      message: "Unable to check saved property",
    });
  }
}