import fs from "fs";
import PdfDocument from "../models/PdfDocument.js";
import pdf from "pdf-parse";

export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Read the uploaded file into a buffer
    const buffer = fs.readFileSync(req.file.path);

    // Parse the PDF buffer directly
    const pdfData = await pdf(buffer);

    // Extract the text content
    const pdfText = pdfData.text;

    // Save to MongoDB
    const pdfDoc = await PdfDocument.create({
      filename: req.file.originalname,
      text: pdfText,
    });

    // Delete temporary uploaded file
    fs.unlinkSync(req.file.path);

    // Respond with the extracted text and document ID
    res.json({ id: pdfDoc._id, text: pdfText });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
};
