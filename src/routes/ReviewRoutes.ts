import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { reviewValidation } from '../middleware/validation';

const router = Router();
const controller = new ReviewController();

router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.get('/recipe/:recipeId', (req, res) => controller.getByRecipeId(req, res));
router.post('/', reviewValidation.create, (req, res) => controller.create(req, res));
router.put('/:id', reviewValidation.update, (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;
