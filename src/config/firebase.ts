import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// For testing and development, use Firebase emulator
const isEmulator = process.env.NODE_ENV !== 'production';

if (isEmulator) {
  // Use Firebase emulator for testing and development
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

  if (!admin.apps.length) {
    admin.initializeApp({
      projectId: 'demo-project',
    });
  }
} else {
  // Load service account key file directly for production
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
