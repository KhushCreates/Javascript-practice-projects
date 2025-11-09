import { RecipeRepository } from '../repositories/RecipeRepository';
import { Recipe, CreateRecipeRequest } from '../models/Recipe';

export class RecipeService {
  static async getAllRecipes(): Promise<Recipe[]> {
    return await RecipeRepository.findAll();
  }

  static async getRecipeById(id: string): Promise<Recipe | null> {
    if (!id) throw new Error('Recipe ID is required');
    return await RecipeRepository.findById(id);
  }

  static async createRecipe(recipeData: CreateRecipeRequest, userId: string): Promise<Recipe> {
    // Basic validation
    if (!recipeData.title || !recipeData.description) {
      throw new Error('Title and description are required');
    }
    
    if (recipeData.cookingTime <= 0) {
      throw new Error('Cooking time must be positive');
    }

    return await RecipeRepository.create(recipeData, userId);
  }

  static async updateRecipe(id: string, updates: Partial<CreateRecipeRequest>, userId: string): Promise<Recipe | null> {
    const existingRecipe = await RecipeRepository.findById(id);
    if (!existingRecipe) throw new Error('Recipe not found');
    
    // Check if user owns the recipe
    if (existingRecipe.createdBy !== userId) {
      throw new Error('You can only update your own recipes');
    }

    return await RecipeRepository.update(id, updates);
  }

  static async deleteRecipe(id: string, userId: string): Promise<boolean> {
    const existingRecipe = await RecipeRepository.findById(id);
    if (!existingRecipe) throw new Error('Recipe not found');
    
    // Check if user owns the recipe
    if (existingRecipe.createdBy !== userId) {
      throw new Error('You can only delete your own recipes');
    }

    return await RecipeRepository.delete(id);
  }
}