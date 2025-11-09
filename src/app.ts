// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import recipeRoutes from './routes/RecipeRoutes';
import { setupSwagger } from './docs/swagger';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/recipes', recipeRoutes);

// Swagger Documentation
setupSwagger(app);

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Recipe API is running!',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Indian Recipe API! 🍛',
    endpoints: {
      health: '/health',
      recipes: '/api/recipes',
      documentation: '/api-docs'
    }
  });
});

export default app;