import request from 'supertest';
import app from '../src/app';

// Mock Firebase Admin
let mockRecipes: any[] = [];
let mockRecipeId = 'mock-id';

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({
        docs: mockRecipes.map(recipe => ({
          id: recipe.id,
          data: () => recipe
        }))
      })),
      doc: jest.fn((id: string) => ({
        get: jest.fn(() => {
          const recipe = mockRecipes.find(r => r.id === id);
          return Promise.resolve({
            exists: !!recipe,
            data: () => recipe || null
          });
        }),
        set: jest.fn(() => Promise.resolve()),
        update: jest.fn((data: any) => {
          const index = mockRecipes.findIndex(r => r.id === id);
          if (index !== -1) {
            mockRecipes[index] = { ...mockRecipes[index], ...data };
          }
          return Promise.resolve();
        }),
        delete: jest.fn(() => {
          mockRecipes = mockRecipes.filter(r => r.id !== id);
          return Promise.resolve();
        })
      })),
      add: jest.fn((data: any) => {
        const newRecipe = { ...data, id: mockRecipeId };
        mockRecipes.push(newRecipe);
        return Promise.resolve({ id: mockRecipeId });
      })
    }))
  })),
  auth: jest.fn(),
  apps: [],
  credential: {
    cert: jest.fn()
  }
}));

// Mock dotenv
jest.mock('dotenv', () => ({
  config: jest.fn()
}));

describe('Indian Recipe API', () => {

  describe('Health Check', () => {
    it('should return API status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.message).toBe('Recipe API is running!');
    });
  });

  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body.message).toContain('Indian Recipe API');
    });
  });

  describe('Recipe Endpoints', () => {
    let createdRecipeId: string;

    describe('GET /api/recipes', () => {
      it('should return empty array when no recipes', async () => {
        const response = await request(app)
          .get('/api/recipes')
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('POST /api/recipes', () => {
      it('should create a new Khichdi recipe', async () => {
        const newRecipe = {
          title: 'Masala Khichdi',
          description: 'Comforting rice and lentil dish with Indian spices, perfect for any time of day',
          cookingTime: 30,
          difficulty: 'Easy',
          cuisineType: 'Comfort Food'
        };

        const response = await request(app)
          .post('/api/recipes')
          .send(newRecipe)
          .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Masala Khichdi');
        expect(response.body.cuisineType).toBe('Comfort Food');
        expect(response.body.difficulty).toBe('Easy');

        createdRecipeId = response.body.id;
      });

      it('should create a Rajma Chawal recipe', async () => {
        const newRecipe = {
          title: 'Rajma Chawal',
          description: 'Kidney bean curry served with steamed rice - a North Indian classic',
          cookingTime: 60,
          difficulty: 'Medium',
          cuisineType: 'North Indian'
        };

        const response = await request(app)
          .post('/api/recipes')
          .send(newRecipe)
          .expect(201);

        expect(response.body.title).toBe('Rajma Chawal');
        expect(response.body.cookingTime).toBe(60);
      });

      it('should create a Poha recipe', async () => {
        const newRecipe = {
          title: 'Poha',
          description: 'Flattened rice breakfast dish with peanuts and spices',
          cookingTime: 20,
          difficulty: 'Easy',
          cuisineType: 'Breakfast'
        };

        const response = await request(app)
          .post('/api/recipes')
          .send(newRecipe)
          .expect(201);

        expect(response.body.title).toBe('Poha');
      });

      it('should reject recipe with missing title', async () => {
        const invalidRecipe = {
          description: 'A recipe without title',
          cookingTime: 30,
          difficulty: 'Easy',
          cuisineType: 'Indian'
        };

        await request(app)
          .post('/api/recipes')
          .send(invalidRecipe)
          .expect(400);
      });

      it('should reject recipe with invalid cooking time', async () => {
        const invalidRecipe = {
          title: 'Test Recipe',
          description: 'A test recipe',
          cookingTime: 0, // Invalid - must be positive
          difficulty: 'Easy',
          cuisineType: 'Indian'
        };

        await request(app)
          .post('/api/recipes')
          .send(invalidRecipe)
          .expect(400);
      });
    });

    describe('GET /api/recipes/:id', () => {
      it('should return the created Khichdi recipe', async () => {
        const response = await request(app)
          .get(`/api/recipes/${createdRecipeId}`)
          .expect(200);

        expect(response.body.id).toBe(createdRecipeId);
        expect(response.body.title).toBe('Masala Khichdi');
      });

      it('should return 404 for non-existent recipe', async () => {
        await request(app)
          .get('/api/recipes/nonexistent123')
          .expect(404);
      });
    });

    describe('PUT /api/recipes/:id', () => {
      it('should update Khichdi recipe cooking time', async () => {
        const updates = {
          cookingTime: 35,
          difficulty: 'Medium',
          description: 'Updated description with more spices and vegetables'
        };

        const response = await request(app)
          .put(`/api/recipes/${createdRecipeId}`)
          .send(updates)
          .expect(200);

        expect(response.body.cookingTime).toBe(35);
        expect(response.body.difficulty).toBe('Medium');
      });
    });

    describe('DELETE /api/recipes/:id', () => {
      it('should delete the Khichdi recipe', async () => {
        await request(app)
          .delete(`/api/recipes/${createdRecipeId}`)
          .expect(204);
      });
    });
  });
});
