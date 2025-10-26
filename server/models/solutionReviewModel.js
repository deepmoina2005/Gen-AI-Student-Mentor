import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  userId: { type: String, required: true },       // Added userId
  role: { type: String, enum: ["user", "assistant"], required: true }, // Added role
  topic: { type: String, default: "General" },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Solution = mongoose.model("Solution", solutionSchema);
export default Solution;