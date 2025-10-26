import mongoose from "mongoose";

const BotSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pdfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PdfDocument",
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    chats: [
      {
        sender: {
          type: String,
          enum: ["user", "bot"],
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    pdfContext: {
      type: Object,
      default: {},
    },

    totalMessages: {
      type: Number,
      default: 0,
    },

    lastInteraction: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bot", BotSchema);