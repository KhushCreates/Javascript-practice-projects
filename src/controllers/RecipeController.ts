import { Request, Response } from 'express';
import { RecipeService } from '../services/RecipeService';

export class RecipeController {
  static async getAllRecipes(req: Request, res: Response) {
    try {
      const recipes = await RecipeService.getAllRecipes();
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  }

  static async getRecipeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const recipe = await RecipeService.getRecipeById(id);
      
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recipe' });
    }
  }

  static async createRecipe(req: Request, res: Response) {
    try {
      // For simplicity, using a mock user ID
      const mockUserId = 'user123';
      const recipe = await RecipeService.createRecipe(req.body, mockUserId);
      res.status(201).json(recipe);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateRecipe(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const mockUserId = 'user123';
      const recipe = await RecipeService.updateRecipe(id, req.body, mockUserId);
      
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      
      res.json(recipe);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteRecipe(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const mockUserId = 'user123';
      await RecipeService.deleteRecipe(id, mockUserId);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}