import { recipesCollection } from '../config/firebase';
import { Recipe, CreateRecipeRequest } from '../models/Recipe';

export class RecipeRepository {
  static async findAll(): Promise<Recipe[]> {
    const snapshot = await recipesCollection.get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Recipe));
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