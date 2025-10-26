import express from "express";
import { uploadPDF } from "../controllers/uploadController.js";
import { upload } from "../configs/multer.js";

const router = express.Router();

router.post("/pdf", upload.single("pdf"), uploadPDF);

export default router;