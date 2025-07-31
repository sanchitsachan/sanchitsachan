import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { validateAuth } from '../middleware/validation';

const router = Router();

// Public routes
router.post('/register', validateAuth, register);
router.post('/login', validateAuth, login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

export default router;