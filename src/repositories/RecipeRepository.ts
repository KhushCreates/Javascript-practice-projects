import { recipesCollection } from '../config/firebase';
import { Recipe, CreateRecipeRequest } from '../models/Recipe';

interface PaginatedRecipes {
  recipes: Recipe[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class RecipeRepository {
  static async findAll(page: number = 1, limit: number = 10): Promise<PaginatedRecipes> {
    const offset = (page - 1) * limit;
    const snapshot = await recipesCollection.limit(limit).offset(offset).get();
    const totalSnapshot = await recipesCollection.get();
    const total = totalSnapshot.size;
    const totalPages = Math.ceil(total / limit);

    const recipes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Recipe));

    return {
      recipes,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };
  }

  static async findById(id: string): Promise<Recipe | null> {
    const doc = await recipesCollection.doc(id).get();
    if (!doc.exists) return null;
    
    return {
      id: doc.id,
      ...doc.data()
    } as Recipe;
  }

  static async create(recipeData: CreateRecipeRequest, userId: string): Promise<Recipe> {
    const newRecipe = {
      ...recipeData,
      createdBy: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await recipesCollection.add(newRecipe);
    
    return {
      id: docRef.id,
      ...newRecipe
    };
  }

  static async update(id: string, updates: Partial<CreateRecipeRequest>): Promise<Recipe | null> {
    const updateData = {
      ...updates,
      updatedAt: new Date()
    };

    await recipesCollection.doc(id).update(updateData);
    return this.findById(id);
  }

  static async delete(id: string): Promise<boolean> {
    await recipesCollection.doc(id).delete();
    return true;
  }
}