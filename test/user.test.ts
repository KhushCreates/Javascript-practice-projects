import request from 'supertest';
import app from '../src/app';
import { resetRateLimiter } from '../src/middleware/rateLimiter';

// Mock Firebase Admin
let mockUsers: any[] = [];
let mockUserId = 'mock-user-id';

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({
        docs: []
      })),
      doc: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ exists: false })),
        set: jest.fn(() => Promise.resolve()),
        update: jest.fn(() => Promise.resolve()),
        delete: jest.fn(() => Promise.resolve())
      })),
      add: jest.fn(() => Promise.resolve({ id: 'mock-id' }))
    }))
  })),
  auth: jest.fn(() => ({
    createUser: jest.fn((data: any) => {
      if (mockUsers.find(u => u.email === data.email)) {
        const error: any = new Error('Email already exists');
        error.code = 'auth/email-already-exists';
        throw error;
      }
      const user = { ...data, uid: mockUserId };
      mockUsers.push(user);
      return Promise.resolve(user);
    }),
    getUserByEmail: jest.fn((email: string) => {
      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        const error: any = new Error('User not found');
        error.code = 'auth/user-not-found';
        throw error;
      }
      return Promise.resolve(user);
    })
  })),
  apps: [],
  credential: {
    cert: jest.fn()
  }
}));

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn()
}));

describe('Authentication API', () => {
  beforeEach(() => {
    mockUsers = [];
    resetRateLimiter();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const newUser = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(201);

      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.uid).toBeDefined();
      expect(response.body.email).toBe(newUser.email);
    });

    it('should reject registration with invalid email', async () => {
      const invalidUser = {
        email: 'invalid-email',
        password: 'password123'
      };

      await request(app)
        .post('/api/auth/register')
        .send(invalidUser)
        .expect(400);
    });

    it('should reject registration with short password', async () => {
      const invalidUser = {
        email: 'test@example.com',
        password: '123'
      };

      await request(app)
        .post('/api/auth/register')
        .send(invalidUser)
        .expect(400);
    });

    it('should reject registration with missing fields', async () => {
      const invalidUser = {
        email: 'test@example.com'
        // missing password
      };

      await request(app)
        .post('/api/auth/register')
        .send(invalidUser)
        .expect(400);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Register a user first
      const newUser = {
        email: 'test@example.com',
        password: 'password123'
      };

      await request(app)
        .post('/api/auth/register')
        .send(newUser)
        .expect(201);
    });

    it('should login successfully with correct credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body.message).toBe('Login successful');
      expect(response.body.uid).toBeDefined();
      expect(response.body.email).toBe(loginData.email);
    });

    it('should reject login with invalid email', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body.error).toBe('Invalid email or password');
    });

    it('should reject login with invalid email format', async () => {
      const loginData = {
        email: 'invalid-email',
        password: 'password123'
      };

      await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(400);
    });

    it('should reject login with missing password', async () => {
      const loginData = {
        email: 'test@example.com'
        // missing password
      };

      await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(400);
    });
  });

  describe('Rate Limit', () => {
    beforeEach(() => {
      resetRateLimiter();
    });

    it('register: returns 429 after 10 attempts', async () => {
      const userData = { email: 'ratelimit@example.com', password: 'password123' };

      for (let i = 0; i < 10; i++) {
        await request(app)
          .post('/api/auth/register')
          .set('x-test-rate-limit', 'true')
          .send(userData)
          .expect(i === 0 ? 201 : 400);
      }

      const response = await request(app)
        .post('/api/auth/register')
        .set('x-test-rate-limit', 'true')
        .send(userData)
        .expect(429);

      expect(response.body.error).toContain('Too many requests');
    });

    it('login: returns 429 after 9 attempts', async () => {
      const userData = { email: 'ratelimitlogin@example.com', password: 'password123' };

      // Register the user first
      await request(app)
        .post('/api/auth/register')
        .set('x-test-rate-limit', 'true')
        .send(userData)
        .expect(201);

      for (let i = 0; i < 9; i++) {
        await request(app)
          .post('/api/auth/login')
          .set('x-test-rate-limit', 'true')
          .send(userData)
          .expect(200); // successful login attempts before hitting rate limit
      }

      // 10th request triggers rate limit
      await request(app)
        .post('/api/auth/login')
        .set('x-test-rate-limit', 'true')
        .send(userData)
        .expect(429);

      // 11th request also rate limited
      const response = await request(app)
        .post('/api/auth/login')
        .set('x-test-rate-limit', 'true')
        .send(userData)
        .expect(429);

      expect(response.body.error).toContain('Too many requests');
    });
  });
});
