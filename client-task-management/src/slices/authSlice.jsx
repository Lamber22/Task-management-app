import { createSlice } from '@reduxjs/toolkit';

/** Initial authentication state */
const initialState = { user: null, isAuthenticated: false };

/** Redux slice for managing authentication */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /** Logs in a user */
        login(state, action) {
        state.user = action.payload;
        state.isAuthenticated = true;
        },

        /** Logs out a user */
        logout(state) {
        state.user = null;
        state.isAuthenticated = false;
        },
    },
});

/** Exports actions and reducer */
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;