import { Router } from 'express';
import { submitContactForm } from '../controllers/contactController';

const router = Router();

// Public routes
router.post('/', submitContactForm);

export default router;