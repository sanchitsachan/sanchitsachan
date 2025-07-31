import { Router } from 'express';
import { 
  getBrokers, 
  getBrokerById, 
  getBrokerBySlug,
  createBroker,
  updateBroker,
  deleteBroker,
  getFeaturedBrokers,
  compareBrokers,
  getBrokerRankings
} from '../controllers/brokerController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validateBroker } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/', getBrokers);
router.get('/featured', getFeaturedBrokers);
router.get('/compare', compareBrokers);
router.get('/rankings', getBrokerRankings);
router.get('/slug/:slug', getBrokerBySlug);
router.get('/:id', getBrokerById);

// Protected routes (Admin only)
router.post('/', authenticateToken, requireAdmin, validateBroker, createBroker);
router.put('/:id', authenticateToken, requireAdmin, validateBroker, updateBroker);
router.delete('/:id', authenticateToken, requireAdmin, deleteBroker);

export default router;