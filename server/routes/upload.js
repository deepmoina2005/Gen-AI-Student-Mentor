import express from "express";
import multer from "multer";
import { uploadPDF } from "../controllers/uploadController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/pdf", upload.single("pdf"), uploadPDF);

export default router;