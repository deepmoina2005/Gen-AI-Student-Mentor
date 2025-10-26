// routes/upload.js
const express = require("express");
const multer = require("multer");
const { uploadPDF } = require("../controllers/uploadController.js");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/pdf", upload.single("pdf"), uploadPDF);

module.exports = router;