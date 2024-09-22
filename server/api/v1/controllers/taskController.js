// controllers/taskController.js
import Task from '../models/Task.js';

// Create Task
export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, category, status } = req.body;

        const task = new Task({
        user: req.user.id,
        title,
        description,
        dueDate,
        category,
        status,
        });

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get All Tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Update Task
export const updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Delete Task
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
