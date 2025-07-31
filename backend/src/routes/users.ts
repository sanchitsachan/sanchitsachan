import { Router } from 'express';
import { getUsers, getUserById } from '../controllers/userController';

const router = Router();

// Public routes
router.get('/', getUsers);
router.get('/:id', getUserById);

export default router;