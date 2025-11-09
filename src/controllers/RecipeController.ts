import { Request, Response, NextFunction } from 'express';
import { RecipeService } from '../services/RecipeService';

export class RecipeController {
  static getAllRecipes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const recipes = await RecipeService.getAllRecipes();
      res.json(recipes);
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

  static createRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // For simplicity, using a mock user ID
      const mockUserId = 'user123';
      const recipe = await RecipeService.createRecipe(req.body, mockUserId);
      res.status(201).json(recipe);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  static updateRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const mockUserId = 'user123';
      const recipe = await RecipeService.updateRecipe(id, req.body, mockUserId);

      if (!recipe) {
        res.status(404).json({ error: 'Recipe not found' });
        return;
      }

      res.json(recipe);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  static deleteRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const mockUserId = 'user123';
      await RecipeService.deleteRecipe(id, mockUserId);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
