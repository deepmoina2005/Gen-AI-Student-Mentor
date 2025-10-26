import axios from "axios";
import Career from "../models/careerModel.js";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAcktCyymXxaPnfg0JFCkDDLUTwGztZDy4';

export const getCareerOptions = (req, res) => {
  const options = ["PCM", "PCMB", "Commerce", "Arts", "Vocational", "Computer Science"];
  res.json({ options });
};

export const getCareerScope = async (req, res) => {
  const { stream } = req.body;

  if (!stream) {
    return res.status(400).json({ error: "Stream is required" });
  }

  try {
    let existingCareer = await Career.findOne({ stream });

    if (existingCareer) {
      existingCareer.views += 1;
      await existingCareer.save();
      return res.json({
        stream: existingCareer.stream,
        scope: existingCareer.scope,
        from: "database",
      });
    }

    const prompt = `
    You are a professional career counselor.
    Explain the best higher studies, career paths, and job opportunities
    for students who choose the ${stream} stream.
    Mention modern fields like data science, design, finance, AI, etc.
    Keep the tone simple and helpful for students.
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );

    const scopeText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received from Vidya.Ai.";

    const newCareer = await Career.create({
      stream,
      scope: scopeText,
    });

    res.json({
      stream: newCareer.stream,
      scope: newCareer.scope,
      from: "With Love @Vidya.Ai",
    });
  } catch (error) {
    console.error("Ai API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch career info from Ai" });
  }
};
