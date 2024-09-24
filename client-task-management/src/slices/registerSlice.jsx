import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

//async to handle user registration
export const registerUser = createAsyncThunk(
    "register/registerUser",
    //rejectWithValue allows return of custom error payload
    async (userData, { rejectWithValue }) => {
        try {
        const response = await axios.post(
            `${baseUrl}/auth/register`,
            userData
        );
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
);
    const initialState = {
        user: null,
        token: null,
        status: 'idle',
        error: null,
    }

    const registerSlice = createSlice({
        name: 'register',
        initialState,
        //handle registration action
        extraReducers: (builder) => {
            builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(registerUser.fulfilled, (state, action) =>{
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Registration failed. Please try again.'
            })

        }
    });

export default registerSlice.reducer;