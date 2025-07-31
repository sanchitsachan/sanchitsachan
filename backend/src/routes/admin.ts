import { Router } from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { 
  getDashboardStats, 
  approveReview, 
  deleteReview,
  toggleUserStatus,
  createRanking,
  updateRanking,
  deleteRanking
} from '../controllers/adminController';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Review management
router.patch('/reviews/:id/approve', approveReview);
router.delete('/reviews/:id', deleteReview);

// User management
router.patch('/users/:id/toggle-status', toggleUserStatus);

// Ranking management
router.post('/rankings', createRanking);
router.put('/rankings/:id', updateRanking);
router.delete('/rankings/:id', deleteRanking);

export default router;