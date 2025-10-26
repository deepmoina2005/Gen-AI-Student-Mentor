import mongoose from "mongoose";

const ResourceSearchSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  results: { type: Array, default: [] },
  searchedAt: { type: Date, default: Date.now },
});

const ResourceSearch = mongoose.model("ResourceSearch", ResourceSearchSchema);

export default ResourceSearch;