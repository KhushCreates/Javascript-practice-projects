import { Router } from 'express';
import { IngredientController } from '../controllers/IngredientController';
import { ingredientValidation } from '../middleware/validation';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
const controller = new IngredientController();

// GET /ingredients - get all ingredients
router.get('/', (req, res) => controller.getAll(req, res));

// GET /ingredients/:id - get an ingredient by ID
router.get('/:id', (req, res) => controller.getById(req, res));

// GET /ingredients/recipe/:recipeId - get ingredients by recipeId
router.get('/recipe/:recipeId', (req, res) => controller.getByRecipeId(req, res));

// POST /ingredients - create new ingredient
router.post('/', authenticateToken, ingredientValidation.create, (req, res) => controller.create(req, res));

// PUT /ingredients/:id - update ingredient
router.put('/:id', authenticateToken, ingredientValidation.update, (req, res) => controller.update(req, res));

// DELETE /ingredients/:id - delete ingredient
router.delete('/:id', authenticateToken, (req, res) => controller.delete(req, res));

export default router;
