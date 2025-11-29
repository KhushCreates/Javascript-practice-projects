import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { auth, db } from '../config/firebase';

export class UserController {
  static register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Create user with Firebase Auth
      const userRecord = await auth.createUser({
        email,
        password,
      });

      res.status(201).json({
        message: 'User registered successfully',
        uid: userRecord.uid,
        email: userRecord.email
      });
    } catch (error: any) {
      console.error('Registration error:', error);

      if (error.code === 'auth/email-already-exists') {
        res.status(400).json({ error: 'Email already exists' });
        return;
      }

      if (error.code === 'auth/invalid-email') {
        res.status(400).json({ error: 'Invalid email format' });
        return;
      }

      if (error.code === 'auth/weak-password') {
        res.status(400).json({ error: 'Password is too weak' });
        return;
      }

      res.status(500).json({ error: 'Failed to register user' });
    }
  };

  static login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Verify the user exists in Firebase Auth
      const user = await auth.getUserByEmail(email);

      // Get user role from Firestore (default to 'user')
      const userDoc = await db.collection('users').doc(user.uid).get();
      const role = userDoc.exists && userDoc.data()?.role === 'admin' ? 'admin' : 'user';

      // Generate JWT token
      const token = jwt.sign(
        { uid: user.uid },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login successful',
        token: token,
        uid: user.uid,
        email: user.email
      });
    } catch (error: any) {
      console.error('Login error:', error);

      if (error.code === 'auth/user-not-found') {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      if (error.code === 'auth/invalid-email') {
        res.status(400).json({ error: 'Invalid email format' });
        return;
      }

      res.status(500).json({ error: 'Failed to login' });
    }
  };
}
