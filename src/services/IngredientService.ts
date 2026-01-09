import { Ingredient } from '../models/Recipe';
import { IngredientRepository } from '../repositories/IngredientRepository';

export class IngredientService {
  private repository: IngredientRepository;

  constructor() {
    this.repository = new IngredientRepository();
  }

  async getAllIngredients(): Promise<Ingredient[]> {
    return this.repository.getAll();
  }

  async getIngredientById(id: string): Promise<Ingredient | null> {
    return this.repository.getById(id);
  }

  async getIngredientsByRecipeId(recipeId: string): Promise<Ingredient[]> {
    return this.repository.getByRecipeId(recipeId);
  }

  async createIngredient(data: Omit<Ingredient, 'id'>): Promise<Ingredient> {
    return this.repository.create(data);
  }

  async updateIngredient(id: string, data: Partial<Omit<Ingredient, 'id'>>): Promise<boolean> {
    return this.repository.update(id, data);
  }

  async deleteIngredient(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
