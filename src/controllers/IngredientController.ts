import { Request, Response } from 'express';
import { IngredientService } from '../services/IngredientService';

export class IngredientController {
  private service: IngredientService;

  constructor() {
    this.service = new IngredientService();
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const ingredients = await this.service.getAllIngredients();
      res.status(200).json(ingredients);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching ingredients', error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const ingredient = await this.service.getIngredientById(req.params.id);
      if (!ingredient) {
        res.status(404).json({ message: 'Ingredient not found' });
        return;
      }
      res.status(200).json(ingredient);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching ingredient', error });
    }
  }

  async getByRecipeId(req: Request, res: Response): Promise<void> {
    try {
      const ingredients = await this.service.getIngredientsByRecipeId(req.params.recipeId);
      res.status(200).json(ingredients);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching ingredients for recipe', error });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const ingredient = await this.service.createIngredient(req.body);
      res.status(201).json(ingredient);
    } catch (error) {
      res.status(500).json({ message: 'Error creating ingredient', error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updated = await this.service.updateIngredient(req.params.id, req.body);
      if (!updated) {
        res.status(404).json({ message: 'Ingredient not found' });
        return;
      }
      res.status(200).json({ message: 'Ingredient updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating ingredient', error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.service.deleteIngredient(req.params.id);
      if (!deleted) {
        res.status(404).json({ message: 'Ingredient not found' });
        return;
      }
      res.status(200).json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting ingredient', error });
    }
  }
}
