// models/Task.js
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },
    title: { type: String, required: true, },
    description: { type: String, },
    dueDate: { type: Date, },
    category: { type: String,
    enum: ['Work', 'Personal', 'Shopping', 'Fitness', 'Other'],
    default: 'Personal',
    },
    status: { type: String,
    enum: ['To Do', 'In Progress', 'Completed'],
    default: 'To Do',
    },
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;
