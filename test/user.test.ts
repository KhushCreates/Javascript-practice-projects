import request from 'supertest';
import app from '../src/app';

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

  describe('Rate Limiting', () => {
    it('should return 429 after 5 register attempts within 15 minutes', async () => {
      const userData = {
        email: 'ratelimit@example.com',
        password: 'password123'
      };

      // Make 5 requests
      for (let i = 0; i < 5; i++) {
        await request(app)
          .post('/api/auth/register')
          .send(userData)
          .expect(i === 0 ? 201 : 400); // First succeeds, others fail due to email exists
      }

      // 6th request should be rate limited
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(429);

      expect(response.body.error).toContain('Too many requests');
    });

    it('should return 429 after 5 login attempts within 15 minutes', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      // Make 5 requests
      for (let i = 0; i < 5; i++) {
        await request(app)
          .post('/api/auth/login')
          .send(loginData)
          .expect(401);
      }

      // 6th request should be rate limited
      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(429);

      expect(response.body.error).toContain('Too many requests');
    });
  });
});
