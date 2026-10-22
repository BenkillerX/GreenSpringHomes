import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    // The property owner
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Basic information
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },

    propertyType: {
      type: String,
      required: true,
      enum: [
        "apartment",
        "house",
        "duplex",
        "bungalow",
        "self-contained",
        "land",
        "office",
        "shop",
        "other",
      ],
    },

    // Rent or sale
    listingType: {
      type: String,
      required: true,
      enum: ["rent", "sale"],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Property details
    bedrooms: {
      type: Number,
      default: 0,
      min: 0,
    },

    bathrooms: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Location
    location: {
      state: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      area: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },
    },

    // Property images
    images: [
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
],

    // Listing status
    status: {
      type: String,
      enum: ["active", "inactive", "rented", "sold"],
      default: "active",
    },

    // Trust / verification
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    // Number of times people have viewed the property
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
