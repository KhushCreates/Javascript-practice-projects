import { Router } from 'express';
import { FavoritesController } from '../controllers/FavoritesController';
import { authenticateToken } from '../middleware/authMiddleware';
import { sensitiveDataRateLimiter } from '../middleware/rateLimiter';

const router = Router();
const controller = new FavoritesController();

router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.get('/user/:userId', (req, res) => controller.getByUserId(req, res));
router.post('/', authenticateToken, sensitiveDataRateLimiter, (req, res) => controller.create(req, res));
router.delete('/:id', authenticateToken, (req, res) => controller.delete(req, res));

export default router;
