const mongoose = require("mongoose");

const learningContentSchema = new mongoose.Schema({
  pdfId: { type: mongoose.Schema.Types.ObjectId, ref: "PdfDocument" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  topic: { type: String, required: true },
  content: {
    summary: String,
    importantPoints: [String],
    questions: [
      {
        question: String,
        answer: String, // direct Q&A, no MCQs
      },
    ],
    conclusion: String,
    resources: [String],
    rawText: String, // fallback field if JSON parse fails
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("LearningContent", learningContentSchema);
