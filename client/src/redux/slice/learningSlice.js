import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  uploadPDFAPI,
  generateContentAPI,
  getAllLearningContentsAPI,
  getLearningContentByIdAPI,
  deleteLearningContentAPI,
  askQuestionAPI, // ✅ new import
} from "../service/learningService.js";

// Initial state
const initialState = {
  pdfs: [],
  contents: [],
  content: null,
  questionAnswer: null, // ✅ store answer from askQuestion
  loading: false,
  error: null,
};

// Async Thunks
export const uploadPDF = createAsyncThunk(
  "learning/uploadPDF",
  async ({ file, userId }, { rejectWithValue }) => {
    try {
      const res = await uploadPDFAPI({ file, userId });
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const generateContent = createAsyncThunk(
  "learning/generateContent",
  async ({ pdfId, userId, topic }, { rejectWithValue }) => {
    try {
      const res = await generateContentAPI({ pdfId, userId, topic });
      return res.learningContent;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const askQuestion = createAsyncThunk(
  "learning/askQuestion",
  async ({ pdfId, userId, question }, { rejectWithValue }) => {
    try {
      const res = await askQuestionAPI({ pdfId, userId, question });
      return res.answer; // { success: true, answer }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getAllLearningContents = createAsyncThunk(
  "learning/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllLearningContentsAPI();
      return res.contents;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getLearningContentById = createAsyncThunk(
  "learning/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getLearningContentByIdAPI(id);
      return res.content;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteLearningContent = createAsyncThunk(
  "learning/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteLearningContentAPI(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    clearContentState: (state) => {
      state.content = null;
      state.questionAnswer = null; // ✅ reset question answer
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload PDF
      .addCase(uploadPDF.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadPDF.fulfilled, (state, action) => {
        state.loading = false;
        state.pdfs.push(action.payload);
      })
      .addCase(uploadPDF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.payload;
      })

      // Generate Content
      .addCase(generateContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateContent.fulfilled, (state, action) => {
        state.loading = false;
        state.contents.unshift(action.payload);
      })
      .addCase(generateContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.payload;
      })

      // Ask Question
      .addCase(askQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.questionAnswer = null;
      })
      .addCase(askQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questionAnswer = action.payload;
      })
      .addCase(askQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.payload;
      })

      // Get All
      .addCase(getAllLearningContents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLearningContents.fulfilled, (state, action) => {
        state.loading = false;
        state.contents = action.payload;
      })
      .addCase(getAllLearningContents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.payload;
      })

      // Get By ID
      .addCase(getLearningContentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLearningContentById.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(getLearningContentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.payload;
      })

      // Delete
      .addCase(deleteLearningContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLearningContent.fulfilled, (state, action) => {
        state.loading = false;
        state.contents = state.contents.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteLearningContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.payload;
      });
  },
});

export const { clearContentState } = learningSlice.actions;
export default learningSlice.reducer;
