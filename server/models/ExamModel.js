const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pdfId: { type: mongoose.Schema.Types.ObjectId, ref: "PdfDocument", required: true },
  title: { type: String, required: true },
  level: { type: String, default: "Easy" },
  mcqs: [
    {
      question: { type: String, required: true },
      options: [{ type: String }],
      answer: { type: String, required: true }, // correct answer from AI/PDF
    },
  ],
  answers: [{ type: String, default: "" }], // store user answers
  submittedAt: { type: Date }, // timestamp when user submits
});

module.exports = mongoose.model("Exam", ExamSchema);
