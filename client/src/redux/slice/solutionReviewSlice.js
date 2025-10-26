import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import solutionReviewService from "../service/solutionReviewService";

// Async Thunks
export const generateSolutionReview = createAsyncThunk(
  "solutionReview/generate",
  async (data, thunkAPI) => {
    try {
      return await solutionReviewService.generateSolutionReview(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAllSolutionReviews = createAsyncThunk(
  "solutionReview/getAll",
  async (_, thunkAPI) => {
    try {
      return await solutionReviewService.getAllSolutionReviews();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getSolutionReviewById = createAsyncThunk(
  "solutionReview/getById",
  async (id, thunkAPI) => {
    try {
      return await solutionReviewService.getSolutionReviewById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteSolutionReview = createAsyncThunk(
  "solutionReview/delete",
  async (id, thunkAPI) => {
    try {
      return await solutionReviewService.deleteSolutionReview(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const solutionReviewSlice = createSlice({
  name: "solutionReview",
  initialState: {
    reviews: [],
    review: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearReviewState: (state) => {
      state.review = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate review
      .addCase(generateSolutionReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateSolutionReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.unshift(action.payload.review);
      })
      .addCase(generateSolutionReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get all reviews
      .addCase(getAllSolutionReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSolutionReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(getAllSolutionReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get review by ID
      .addCase(getSolutionReviewById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSolutionReviewById.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload.review;
      })
      .addCase(getSolutionReviewById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete review
      .addCase(deleteSolutionReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSolutionReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
          (rev) => rev._id !== action.meta.arg
        );
      })
      .addCase(deleteSolutionReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviewState } = solutionReviewSlice.actions;
export default solutionReviewSlice.reducer;