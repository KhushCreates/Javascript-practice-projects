import { Request, Response, NextFunction } from 'express';
import { RecipeService } from '../services/RecipeService';

interface AuthRequest extends Request {
  user?: {
    uid: string;
    role: string;
  };
}

export class RecipeController {
  static getAllRecipes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const recipes = await RecipeService.getAllRecipes();
      res.json(recipes.recipes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  };

  static getRecipeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const recipe = await RecipeService.getRecipeById(id);

      if (!recipe) {
        res.status(404).json({ error: 'Recipe not found' });
        return;
      }

      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recipe' });
    }
  };

  static createRecipe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = 'test-user';
      const recipe = await RecipeService.createRecipe(req.body, userId);
      res.status(201).json(recipe);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  static updateRecipe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = 'test-user';
      const recipe = await RecipeService.updateRecipe(id, req.body, userId);

      if (!recipe) {
        res.status(404).json({ error: 'Recipe not found' });
        return;
      }

      res.json(recipe);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  static deleteRecipe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = 'test-user';
      await RecipeService.deleteRecipe(id, userId);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
