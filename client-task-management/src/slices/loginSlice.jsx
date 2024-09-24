import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Async action to handle user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, { email, password });
      const { user, token } = response.data;  // Extract user and token
      return { user, token };  // Return both user and token
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,  // Initialize from localStorage
    isAuthenticated: !!localStorage.getItem('token'),
    status: 'idle',
    error: null,
};

const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');  // Clear token from localStorage
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            // Store token in localStorage
            localStorage.setItem('token', action.payload.token);
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload?.message || 'Login failed. Please try again.';
        });
    },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;

