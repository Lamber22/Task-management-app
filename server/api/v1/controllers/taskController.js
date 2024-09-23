// controllers/taskController.js
import Task from '../models/Task.js';

// Create Task
export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, category, status } = req.body;

        const task = new Task({
        user: req.user.userId,
        title,
        description,
        dueDate,
        category,
        status,
        });

        await task.save();
        res.status(201).json({
            status: "success",
            message: "Task created successfully",
            data: task,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Get All Tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.userId });
        if (tasks.length === 0) return res.json("No task found");
        res.status(200).json({
            status: "success",
            message: "Tasks retrieved successfully",
            numTasks: tasks.length,
            data: tasks,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Task by ID
export const getTaskByID = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
        return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({
            status: "success",
            message: "Task retrieved successfully",
            data: task,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};
// Update Task
export const updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
        return res.status(404).json({ message: 'Task not found' });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            status: "success",
            message: "Task updated successfully",
            data: task,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Delete Task
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
        return res.status(404).json({ message: 'Task not found' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Task deleted successfully",
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
