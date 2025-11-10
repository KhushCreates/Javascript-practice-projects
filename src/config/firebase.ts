import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// For testing, use Firebase emulator
const isTest = process.env.NODE_ENV === 'test';

if (isTest) {
  // Use Firebase emulator for testing
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

  if (!admin.apps.length) {
    admin.initializeApp({
      projectId: 'test-project',
    });
  }
} else {
  // ✅ Load service account key file directly
  const serviceAccountPath = path.resolve(__dirname, '../../securityAccountkey.json');
  const serviceAccount = require(serviceAccountPath);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

export const db = admin.firestore();
export const auth = admin.auth();

// Collection references
export const recipesCollection = db.collection('recipes');
export const ingredientsCollection = db.collection('ingredients');
export const reviewsCollection = db.collection('reviews');
export const favoritesCollection = db.collection('favorites');
