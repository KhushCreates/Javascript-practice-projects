import { Favorite } from '../models/Recipe';
import { db } from '../config/firebase';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';

const collection = db.collection('favorites');

export class FavoritesRepository {
  async getAll(): Promise<Favorite[]> {
    const snapshot = await collection.get();
    return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() } as Favorite));
  }

  async getById(id: string): Promise<Favorite | null> {
    const doc = await collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as Favorite;
  }

  async getByUserId(userId: string): Promise<Favorite[]> {
    const snapshot = await collection.where('userId', '==', userId).get();
    return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() } as Favorite));
  }

  async create(favorite: Omit<Favorite, 'id'>): Promise<Favorite> {
    const docRef = await collection.add(favorite);
    return { id: docRef.id, ...favorite };
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
