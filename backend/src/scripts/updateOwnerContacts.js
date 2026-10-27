import mongoose from "mongoose";
import "dotenv/config";
import User from "../modules/models/Users.js";

const updateOwnerContacts = async () => {
  try {
    const mongoURI = process.env.MONGODN_URI;

    if (!mongoURI) {
      throw new Error("MongoDB connection string is missing");
    }

    await mongoose.connect(mongoURI);

    console.log("Connected to MongoDB");

    // Add phoneNumber only where it doesn't exist
    const phoneResult = await User.updateMany(
      {
        role: "propertyOwner",
        phoneNumber: { $exists: false },
      },
      {
        $set: { phoneNumber: null },
      }
    );

    // Add whatsappNumber only where it doesn't exist
    const whatsappResult = await User.updateMany(
      {
        role: "propertyOwner",
        whatsappNumber: { $exists: false },
      },
      {
        $set: { whatsappNumber: null },
      }
    );

    // Add contactVisibility only where it doesn't exist
    const visibilityResult = await User.updateMany(
      {
        role: "propertyOwner",
        contactVisibility: { $exists: false },
      },
      {
        $set: { contactVisibility: false },
      }
    );

    console.log("Migration completed successfully!");

    console.log("Phone fields updated:", phoneResult.modifiedCount);
    console.log("WhatsApp fields updated:", whatsappResult.modifiedCount);
    console.log(
      "Contact visibility fields updated:",
      visibilityResult.modifiedCount
    );
  } catch (error) {
    console.error("Migration failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

updateOwnerContacts();