const mongoose = require("mongoose");

const BotSchema = new mongoose.Schema(
  {
    // Linked user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Uploaded PDF
    pdfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PdfDocument",
      required: true,
    },

    // User-given topic (like “Physics Chapter 1”)
    topic: {
      type: String,
      required: true,
    },

    // Optional short description
    description: {
      type: String,
    },

    // Store chat messages between user & bot
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

    // For storing extracted text or embeddings later
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

module.exports = mongoose.model("Bot", BotSchema);