import { Request, Response } from 'express';
import { auth } from '../config/firebase';

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

      // For Firebase Admin SDK, we need to verify the user exists
      // In a real app, you'd use Firebase Auth SDK on client side for login
      // Here we'll just verify the user exists and return a success message
      const user = await auth.getUserByEmail(email);

      // In production, you'd generate a custom token or use Firebase Auth
      res.json({
        message: 'Login successful',
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
