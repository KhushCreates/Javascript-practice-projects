import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import recipeRoutes from './routes/RecipeRoutes';
import userRoutes from './routes/UserRoutes';
import ingredientRoutes from './routes/IngredientRoutes';
import reviewRoutes from './routes/ReviewRoutes';
import favoritesRoutes from './routes/FavoritesRoutes';
import { setupSwagger } from './docs/swagger';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/favorites', favoritesRoutes);

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
      auth: '/api/auth',
      ingredients: '/api/ingredients',
      reviews: '/api/reviews',
      favorites: '/api/favorites',
      documentation: '/api-docs'
    }
  });
});

export default app;
