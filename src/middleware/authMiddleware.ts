import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { auth, db } from '../config/firebase';

interface AuthRequest extends Request {
  user?: {
    uid: string;
    role: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { uid: string };

    // Get user role from Firestore (default to 'user')
    const userDoc = await db.collection('users').doc(decoded.uid).get();
    const role = userDoc.exists && userDoc.data()?.role === 'admin' ? 'admin' : 'user';

    // Attach user info to request
    req.user = {
      uid: decoded.uid,
      role: role
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(403).json({ error: 'Forbidden' });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ error: 'Forbidden: Admin access required' });
    return;
  }
  next();
};
