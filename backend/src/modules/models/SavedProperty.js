import mongoose from "mongoose";

const savedPropertySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent the same user from saving
// the same property twice
savedPropertySchema.index( { user: 1, property: 1 }, { unique: true } );

const SavedProperty = mongoose.model( "SavedProperty", savedPropertySchema );
export default SavedProperty;