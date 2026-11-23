const supportTicketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "account",
        "property",
        "payment",
        "technical",
        "complaint",
        "other",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "open",
        "in_progress",
        "resolved",
        "closed",
      ],
      default: "open",
    },

    priority: {
      type: String,
      enum: ["low", "normal", "high", "urgent"],
      default: "normal",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);