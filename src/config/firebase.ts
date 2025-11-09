import admin from 'firebase-admin';
import dotenv from 'dotenv';

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
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
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
