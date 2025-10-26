const express = require("express");
const { generateExam, getExamById, getUserExams, deleteExam, checkAnswers } = require("../controllers/examController.js");

const router = express.Router();

router.post("/generate", generateExam);
router.get("/:examId", getExamById);
router.get("/user/:userId", getUserExams);
router.delete("/:examId", deleteExam);
router.post("/checkAnswers", checkAnswers)
module.exports = router;
