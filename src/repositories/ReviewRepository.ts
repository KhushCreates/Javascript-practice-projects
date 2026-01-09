import { Review } from '../models/Recipe';
import { db } from '../config/firebase';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';

const collection = db.collection('reviews');

export class ReviewRepository {
  async getAll(): Promise<Review[]> {
    const snapshot = await collection.get();
    return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() } as Review));
  }

  async getById(id: string): Promise<Review | null> {
    const doc = await collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as Review;
  }

  async getByRecipeId(recipeId: string): Promise<Review[]> {
    const snapshot = await collection.where('recipeId', '==', recipeId).get();
    return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() } as Review));
  }

  async create(review: Omit<Review, 'id'>): Promise<Review> {
    const docRef = await collection.add(review);
    return { id: docRef.id, ...review };
  }

  async update(id: string, review: Partial<Omit<Review, 'id'>>): Promise<boolean> {
    const docRef = collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return false;
    }
    await docRef.update(review);
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
