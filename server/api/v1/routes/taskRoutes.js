// routes/taskRoutes.js
import { Router } from 'express';
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';

const router = Router();

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
