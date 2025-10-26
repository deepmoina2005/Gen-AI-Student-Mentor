import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config"
import uploadRoutes from "./routes/upload.js";
import askRoutes from "./routes/examRoutes.js";
import userRouter from "./routes/userRoutes.js";
import learningRouter from "./routes/learningRoutes.js";
import doubtrouter from "./routes/doubtRoutes.js";
import careerRouter from "./routes/careerRoutes.js";
import resourceRouter from "./routes/resourceRoute.js";
import solutionRouter from "./routes/solutionReviewRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/exam", askRoutes);
app.use("/api/auth", userRouter);
app.use("/api/learning", learningRouter);
app.use("/api/doubt", doubtrouter);
app.use("/api/career", careerRouter);
app.use("/api/resource", resourceRouter);
app.use("/api/solution", solutionRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));