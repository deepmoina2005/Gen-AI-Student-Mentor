import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    stream: {
      type: String,
      required: true,
      trim: true,
    },
    scope: {
      type: String,
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Career = mongoose.model("Career", careerSchema);

export default Career;