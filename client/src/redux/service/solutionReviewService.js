import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL + "/solution-review";
// Generate a new solution review
const generateSolutionReview = async (data) => {
  const response = await axios.post(`${BASE_URL}/generate`, data);
  return response.data;
};

// Get all solution reviews
const getAllSolutionReviews = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Get a solution review by ID
const getSolutionReviewById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Delete a solution review by ID
const deleteSolutionReview = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

const solutionReviewService = {
  generateSolutionReview,
  getAllSolutionReviews,
  getSolutionReviewById,
  deleteSolutionReview,
};

export default solutionReviewService;