import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';

// Create a Redux store with a single reducer for authentication
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
