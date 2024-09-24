// src/slices/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Create a new task (POST)
export const createTask = createAsyncThunk('tasks/createTask', async (task, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}/task/`, task, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data.data; // Assuming response contains the created task
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to create task');
    }
});

// Fetch all tasks (GET)
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseUrl}/task/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT stored in localStorage
            },
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch tasks');
    }
});

// Update an existing task (PUT)
export const updateTask = createAsyncThunk('tasks/updateTask', async (task, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${baseUrl}/task/${task._id}`, task, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data.data; // Returns the updated task
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to update task');
    }
});

// Delete a task (DELETE)
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { rejectWithValue }) => {
    try {
        await axios.delete(`${baseUrl}/task/${taskId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return taskId; // Return the ID of the deleted task
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Failed to delete task');
    }
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        // Additional reducers if needed
    },
    extraReducers: (builder) => {
        // Fetch Tasks
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // Create Task
        builder
            .addCase(createTask.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks.push(action.payload); // Add the new task to the list
            })
            .addCase(createTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // Update Task
        builder
            .addCase(updateTask.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedTask = action.payload;
                const existingTask = state.tasks.find((task) => task._id === updatedTask._id);
                if (existingTask) {
                    Object.assign(existingTask, updatedTask); // Update the existing task in the state
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        // Delete Task
        builder
            .addCase(deleteTask.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = state.tasks.filter((task) => task._id !== action.payload); // Remove the deleted task
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default taskSlice.reducer;
