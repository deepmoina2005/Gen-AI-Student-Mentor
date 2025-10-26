import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI, getProfileAPI, logoutAPI } from "../service/authService";

let storedUser = null;
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("userInfo");
  if (saved && saved !== "undefined") {
    try {
      storedUser = JSON.parse(saved);
    } catch {
      storedUser = null;
    }
  }
}

const initialState = {
  user: storedUser,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await registerAPI(data);
    return res;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await loginAPI(data);
    return res;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});


export const getProfile = createAsyncThunk("auth/profile", async (_, { rejectWithValue }) => {
  try {
    const res = await getProfileAPI();
    return res.user;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await logoutAPI();
    return res;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success && action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
      });
  },
});

export default authSlice.reducer;