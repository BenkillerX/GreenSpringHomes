import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    recipient: {
      type: String,
      enum: ["all", "tenant", "propertyOwner", "serviceProvider"],
      required: true,
    },
    type: {
      type: String,
      enum: ["general", "announcement", "alert", "update"],
      default: "general",
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;