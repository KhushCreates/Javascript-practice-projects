import { Ingredient } from '../models/Recipe';
import { db } from '../config/firebase';
import { QueryDocumentSnapshot, DocumentSnapshot } from 'firebase-admin/firestore';

const collection = db.collection('ingredients');

export class IngredientRepository {
  async getAll(): Promise<Ingredient[]> {
    const snapshot = await collection.get();
    return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() } as Ingredient));
  }

  async getById(id: string): Promise<Ingredient | null> {
    const doc = await collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as Ingredient;
  }

  async getByRecipeId(recipeId: string): Promise<Ingredient[]> {
    const snapshot = await collection.where('recipeId', '==', recipeId).get();
    return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() } as Ingredient));
  }

  async create(ingredient: Omit<Ingredient, 'id'>): Promise<Ingredient> {
    const docRef = await collection.add(ingredient);
    return { id: docRef.id, ...ingredient };
  }

  async update(id: string, ingredient: Partial<Omit<Ingredient, 'id'>>): Promise<boolean> {
    const docRef = collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return false;
    }
    await docRef.update(ingredient);
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const docRef = collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return false;
    }
    await docRef.delete();
    return true;
  }
}
