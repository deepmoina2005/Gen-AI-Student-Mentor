// src/redux/slice/examSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  uploadPDFAPI,
  generateExamAPI,
  getUserExamsAPI,
  getExamByIdAPI,
  deleteExamAPI,
  checkAnswersAPI, // ✅ Import new API
} from "../service/testService"
const initialState = {
  exams: [],           // All exams for user
  selectedExam: null,  // Exam data for detail view
  uploadedPDF: null,   // PDF uploaded
  loading: false,
  error: null,
  checkResult: null,   // Result after checking answers
};

// ----------------- Async Thunks -----------------

// Upload PDF
export const uploadPDF = createAsyncThunk(
  "exam/uploadPDF",
  async ({ file, userId }, { rejectWithValue }) => {
    try {
      const res = await uploadPDFAPI({ file, userId });
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Upload PDF failed");
    }
  }
);

// Create Exam from existing PDF
export const createExam = createAsyncThunk(
  "exam/createExam",
  async ({ userId, title, pdfId }, { rejectWithValue }) => {
    try {
      const res = await generateExamAPI({ userId, title, pdfId });
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Create Exam failed");
    }
  }
);

// Get all exams for a user
export const getUserExams = createAsyncThunk(
  "exam/getUserExams",
  async (userId, { rejectWithValue }) => {
    try {
      const exams = await getUserExamsAPI(userId);
      return exams;
    } catch (err) {
      return rejectWithValue(err.message || "Get User Exams failed");
    }
  }
);

// Get Exam by ID
export const getExamById = createAsyncThunk(
  "exam/getExamById",
  async (examId, { rejectWithValue }) => {
    try {
      const exam = await getExamByIdAPI(examId);
      return exam;
    } catch (err) {
      return rejectWithValue(err.message || "Get Exam by ID failed");
    }
  }
);

// Delete Exam
export const deleteExam = createAsyncThunk(
  "exam/deleteExam",
  async (examId, { rejectWithValue }) => {
    try {
      const result = await deleteExamAPI(examId);
      return { examId, message: result.message };
    } catch (err) {
      return rejectWithValue(err.message || "Delete Exam failed");
    }
  }
);

// ----------------- Check Answers (NEW) -----------------
export const checkAnswers = createAsyncThunk(
  "exam/checkAnswers",
  async ({ examId, userAnswers }, { rejectWithValue }) => {
    try {
      const results = await checkAnswersAPI({ examId, userAnswers });
      return results; // Array of { question, options, userAnswer, correctAnswer, isCorrect }
    } catch (err) {
      return rejectWithValue(err.message || "Check answers failed");
    }
  }
);

// ----------------- Slice -----------------
const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    clearExamState: (state) => {
      state.loading = false;
      state.error = null;
      state.uploadedPDF = null;
      state.selectedExam = null;
      state.checkResult = null;
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
        state.uploadedPDF = action.payload;
      })
      .addCase(uploadPDF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Exam
      .addCase(createExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exams.unshift(action.payload);
      })
      .addCase(createExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get User Exams
      .addCase(getUserExams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserExams.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
      })
      .addCase(getUserExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Exam by ID
      .addCase(getExamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExamById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedExam = action.payload;
      })
      .addCase(getExamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Exam
      .addCase(deleteExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = state.exams.filter(exam => exam._id !== action.payload.examId);
      })
      .addCase(deleteExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Check Answers
      .addCase(checkAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.checkResult = action.payload; // Store results for highlighting
      })
      .addCase(checkAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearExamState } = examSlice.actions;
export default examSlice.reducer;
