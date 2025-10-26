const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const uploadRoutes = require("./routes/upload.js");
const askRoutes = require("./routes/examRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const learningRouter = require("./routes/learningRoutes.js");
const doubtrouter = require("./routes/doubtRoutes.js");
const careerRouter = require("./routes/careerRoutes.js");
const resourceRouter = require("./routes/resourceRoute.js");
const solutionRouter = require("./routes/solutionReviewRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/exam", askRoutes);
app.use("/api/auth", userRouter);
app.use("/api/learning", learningRouter);
app.use("/api/doubt", doubtrouter);
app.use("/api/solution", solutionRouter);
app.use("/api/career", careerRouter);
app.use("/api/resource", resourceRouter)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));