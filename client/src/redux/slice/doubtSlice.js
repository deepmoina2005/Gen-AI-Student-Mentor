import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBotSessionAPI,
  chatWithPDFAPI,
  getBotChatsAPI,
  uploadPDFAPI,
} from "../service/doubtService.js";

// Initial state
const initialState = {
  currentSession: null,
  chats: [],
  loading: false,
  error: null,
  uploadedPDF: null,
};

// Thunks

// Upload PDF
export const uploadPDF = createAsyncThunk(
  "doubt/uploadPDF",
  async ({ file, userId }, { rejectWithValue }) => {
    try {
      const res = await uploadPDFAPI({ file, userId });
      return res; // { _id, text, filename }
    } catch (err) {
      return rejectWithValue(err.message || err);
    }
  }
);

// Create bot session
export const createBotSession = createAsyncThunk(
  "doubt/createBotSession",
  async ({ userId, pdfId, topic, description }, { rejectWithValue }) => {
    try {
      const res = await createBotSessionAPI({ userId, pdfId, topic, description });
      return res.botSession;
    } catch (err) {
      return rejectWithValue(err.message || err);
    }
  }
);

// Chat with PDF
export const chatWithPDF = createAsyncThunk(
  "doubt/chatWithPDF",
  async ({ botId, userMessage }, { rejectWithValue }) => {
    try {
      const res = await chatWithPDFAPI({ botId, userMessage });
      return res;
    } catch (err) {
      return rejectWithValue(err.message || err);
    }
  }
);

// Get bot chats
export const getBotChats = createAsyncThunk(
  "doubt/getBotChats",
  async (botId, { rejectWithValue }) => {
    try {
      const res = await getBotChatsAPI(botId);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || err);
    }
  }
);

const doubtSlice = createSlice({
  name: "doubt",
  initialState,
  reducers: {
    addUserMessage: (state, action) => {
      state.chats.push({ sender: "user", message: action.payload });
    },
    clearDoubtState: (state) => {
      state.currentSession = null;
      state.chats = [];
      state.loading = false;
      state.error = null;
      state.uploadedPDF = null;
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

      // Create bot session
      .addCase(createBotSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBotSession.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSession = action.payload;
        state.chats = [];
      })
      .addCase(createBotSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Chat with PDF
      .addCase(chatWithPDF.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(chatWithPDF.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.userMessage)
          state.chats.push({ sender: "user", message: action.payload.userMessage });
        if (action.payload.botResponse)
          state.chats.push({ sender: "bot", message: action.payload.botResponse });
      })
      .addCase(chatWithPDF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get bot chats
      .addCase(getBotChats.fulfilled, (state, action) => {
        state.chats = action.payload.chats;
      });
  },
});

export const { addUserMessage, clearDoubtState } = doubtSlice.actions;
export default doubtSlice.reducer;
