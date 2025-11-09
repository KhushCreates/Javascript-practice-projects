export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookingTime: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisineType: string;
  createdBy: string; // user ID
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRecipeRequest {
  title: string;
  description: string;
  cookingTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisineType: string;
}

// src/models/Ingredient.ts
export interface Ingredient {
  id: string;
  recipeId: string;
  name: string;
  quantity: string;
  unit?: string; // optional - like 'grams', 'cups'
}

// src/models/Review.ts
export interface Review {
  id: string;
  recipeId: string;
  userId: string;
  rating: number; // 1-5 stars
  comment: string;
  createdAt: Date;
}

// src/models/Favorite.ts
export interface Favorite {
  id: string;
  userId: string;
  recipeId: string;
  addedAt: Date;
}