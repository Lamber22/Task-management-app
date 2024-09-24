// routes/taskRoutes.js
import { Router } from 'express';
import {
    createTask,
    getTasks,
    getTaskByID,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';
import authMiddleware from '../utils/authMiddleware.js';
const router = Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.get('/:id', authMiddleware, getTaskByID);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;
