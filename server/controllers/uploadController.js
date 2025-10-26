// controllers/uploadController.js
import fs from "fs";
import { createRequire } from "module";
import PdfDocument  from "../models/PdfDocument.js";
import pdf from "pdf-parse/lib/pdf-parse.js";

export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const buffer = fs.readFileSync(req.file.path);

    const parser = new pdf({ data: buffer });
    const pdfData = await parser.getText(); // extract text
    await parser.destroy(); // clean up

    const pdfText = pdfData.text;

    const pdfDoc = await PdfDocument.create({
      filename: req.file.originalname,
      text: pdfText
    });

    // Delete temporary uploaded file
    fs.unlinkSync(req.file.path);

    res.json({ id: pdfDoc._id, text: pdfText });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
};