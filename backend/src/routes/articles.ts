import { Router } from 'express';
import { getArticles, getArticleBySlug } from '../controllers/articleController';

const router = Router();

// Public routes
router.get('/', getArticles);
router.get('/slug/:slug', getArticleBySlug);

export default router;