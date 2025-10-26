const PdfDocument = require("../models/PdfDocument.js");
const Exam = require("../models/ExamModel.js");
const { GroqLLM } = require("../utils/groqLLM.js");

// ----------------- Helper: parse MCQs -----------------
function parseMCQs(aiText) {
  if (!aiText || aiText.trim() === "") return [];
  const lines = aiText.split("\n").filter(Boolean);
  const mcqs = [];
  let current = {};

  for (let line of lines) {
    line = line.trim();
    if (line.startsWith("Q")) {
      if (current.question) mcqs.push(current);
      current = { question: line.split(":")[1]?.trim() || "", options: [], answer: "" };
    } else if (/^[abcd]\)/i.test(line)) {
      current.options.push(line.split(")")[1]?.trim() || "");
    } else if (line.toLowerCase().startsWith("answer")) {
      current.answer = line.split(":")[1]?.trim() || "";
    }
  }

  if (current.question) mcqs.push(current);
  return mcqs.slice(0, 10); // Limit to 10 questions
}

// ----------------- Generate Exam -----------------
const generateExam = async (req, res) => {
  try {
    const { userId, title, pdfId, level } = req.body;
    if (!userId || !title || !pdfId)
      return res.status(400).json({ success: false, message: "Missing required fields" });

    const pdfDoc = await PdfDocument.findById(pdfId);
    if (!pdfDoc) return res.status(404).json({ success: false, message: "PDF not found" });
    if (!pdfDoc.text || pdfDoc.text.trim() === "")
      return res.status(400).json({ success: false, message: "PDF has no text content" });

    const llm = new GroqLLM();
    const prompt = `
      You are an AI teacher. Generate 10 multiple-choice questions from the following PDF content.
      Respond in this format:
      Q1: <question>
      a) <option1>
      b) <option2>
      c) <option3>
      d) <option4>
      Answer: <correct option letter>

      PDF Content:
      ${pdfDoc.text}
    `;

    const response = await llm.call({ input: prompt });
    const aiText = typeof response === "string" ? response : response.text || response.output || "";
    const mcqs = parseMCQs(aiText);

    if (!mcqs.length) return res.status(500).json({ success: false, message: "No MCQs generated" });

    pdfDoc.correctAnswers = mcqs.map(q => q.answer);
    await pdfDoc.save();

    const examRecord = await Exam.create({
      userId,
      pdfId,
      title,
      level: level || "Easy",
      mcqs,
      answers: Array(mcqs.length).fill(""), // store as array of strings
      score: 0,
      total: mcqs.length,
      submittedAt: null,
    });

    res.status(200).json({ success: true, exam: examRecord });
  } catch (err) {
    console.error("Generate Exam error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ----------------- Check Answers API -----------------
// ✅ checkAnswers Controller
const checkAnswers = async (req, res) => {
  try {
    const { examId, userAnswers } = req.body;

    // 🔹 Validate request data
    if (!examId || !Array.isArray(userAnswers)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data: examId and userAnswers are required.",
      });
    }

    // 🔹 Find exam
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found.",
      });
    }

    // 🔹 Normalize answer text (trim + lowercase)
    const normalizeAnswer = (ans) =>
      ans ? ans.toString().trim().toLowerCase() : "";

    // 🔹 Compare answers and build results
    const results = exam.mcqs.map((q, idx) => {
      const userAns = normalizeAnswer(userAnswers[idx]);
      const correctAns = normalizeAnswer(q.answer);

      return {
        question: q.question,
        options: q.options,
        userAnswer: userAns || "Not Answered",
        correctAnswer: correctAns,
        isCorrect: userAns === correctAns,
      };
    });

    // 🔹 Calculate score
    const score = results.filter((r) => r.isCorrect).length;
    const total = exam.mcqs.length;

    // 🔹 Optional: Save submitted answers in DB (if needed)
    exam.answers = userAnswers;
    await exam.save();

    // ✅ Send response
    res.status(200).json({
      success: true,
      message: "Answers checked successfully.",
      score,
      total,
      results,
    });
  } catch (err) {
    console.error("❌ Check Answers error:", err);
    res.status(500).json({
      success: false,
      message: "Server error: " + err.message,
    });
  }
};

// ----------------- Get Exam by ID -----------------
const getExamById = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ success: false, message: "Exam not found" });
    res.status(200).json({ success: true, exam });
  } catch (err) {
    console.error("Get Exam by ID error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ----------------- Get User Exams -----------------
const getUserExams = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ success: false, message: "Missing userId" });

    const exams = await Exam.find({ userId });
    res.status(200).json({ success: true, exams });
  } catch (err) {
    console.error("Get User Exams error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ----------------- Delete Exam -----------------
const deleteExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findByIdAndDelete(examId);
    if (!exam) return res.status(404).json({ success: false, message: "Exam not found" });
    res.status(200).json({ success: true, message: "Exam deleted" });
  } catch (err) {
    console.error("Delete Exam error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { generateExam, getExamById, getUserExams, deleteExam, checkAnswers };
