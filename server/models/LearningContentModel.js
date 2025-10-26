import mongoose from "mongoose";

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
        answer: String,
      },
    ],
    conclusion: String,
    resources: [String],
    rawText: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const LearningContent = mongoose.model("LearningContent", learningContentSchema);

export default LearningContent;  // ✅ ES module export
