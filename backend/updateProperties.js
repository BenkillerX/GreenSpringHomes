import mongoose from "mongoose";
import dotenv from "dotenv";
import Property from "./src/modules/models/Property.js";

dotenv.config();

const updateProperties = async () => {
  try {
    await mongoose.connect(process.env.MONGODN_URI);

    console.log("Connected to MongoDB");

    const result = await Property.updateMany(
      {},
      {
        $set: {
          isFeatured: false,
          priority: 0,
        },
      }
    );

    console.log("Migration completed:", result);

  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
  }
};

updateProperties();
