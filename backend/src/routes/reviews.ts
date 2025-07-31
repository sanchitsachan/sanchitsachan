import { Router } from 'express';
import { 
  getReviews, 
  createReview, 
  updateReview, 
  deleteReview, 
  voteOnReview 
} from '../controllers/reviewController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getReviews);

// Protected routes
router.post('/', authenticateToken, createReview);
router.put('/:id', authenticateToken, updateReview);
router.delete('/:id', authenticateToken, deleteReview);
router.post('/:id/vote', authenticateToken, voteOnReview);

export default router;