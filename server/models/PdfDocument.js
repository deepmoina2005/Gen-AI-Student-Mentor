import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  filename: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const PdfDocument = mongoose.model("PdfDocument", pdfSchema);

export default PdfDocument; // ✅ ES module export