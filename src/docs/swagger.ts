import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Indian Recipe API',
      version: '1.0.0',
      description: 'A delicious API for managing Indian recipes',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Recipe: {
          type: 'object',
          required: ['id', 'title', 'description', 'cookingTime', 'difficulty', 'cuisineType', 'createdBy', 'createdAt', 'updatedAt'],
          properties: {
            id: { type: 'string', description: 'Unique identifier for the recipe' },
            title: { type: 'string', description: 'Title of the recipe' },
            description: { type: 'string', description: 'Description of the recipe' },
            cookingTime: { type: 'number', description: 'Cooking time in minutes' },
            difficulty: { type: 'string', enum: ['Easy', 'Medium', 'Hard'], description: 'Difficulty level' },
            cuisineType: { type: 'string', description: 'Cuisine type' },
            createdBy: { type: 'string', description: 'User ID who created the recipe' },
            createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
          },
        },
        Ingredient: {
          type: 'object',
          required: ['id', 'recipeId', 'name', 'quantity'],
          properties: {
            id: { type: 'string' },
            recipeId: { type: 'string' },
            name: { type: 'string' },
            quantity: { type: 'string' },
            unit: { type: 'string', nullable: true },
          },
        },
        Review: {
          type: 'object',
          required: ['id', 'recipeId', 'userId', 'rating', 'comment', 'createdAt'],
          properties: {
            id: { type: 'string' },
            recipeId: { type: 'string' },
            userId: { type: 'string' },
            rating: { type: 'integer', minimum: 1, maximum: 5 },
            comment: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Favorite: {
          type: 'object',
          required: ['id', 'userId', 'recipeId', 'addedAt'],
          properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            recipeId: { type: 'string' },
            addedAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateRecipeRequest: {
          type: 'object',
          required: ['title', 'description', 'cookingTime', 'difficulty', 'cuisineType'],
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            cookingTime: { type: 'number' },
            difficulty: { type: 'string', enum: ['Easy', 'Medium', 'Hard'] },
            cuisineType: { type: 'string' },
          },
        },
        CreateIngredientRequest: {
          type: 'object',
          required: ['recipeId', 'name', 'quantity'],
          properties: {
            recipeId: { type: 'string' },
            name: { type: 'string' },
            quantity: { type: 'string' },
            unit: { type: 'string', nullable: true },
          },
        },
        CreateReviewRequest: {
          type: 'object',
          required: ['recipeId', 'userId', 'rating', 'comment'],
          properties: {
            recipeId: { type: 'string' },
            userId: { type: 'string' },
            rating: { type: 'integer', minimum: 1, maximum: 5 },
            comment: { type: 'string' },
          },
        },
        CreateFavoriteRequest: {
          type: 'object',
          required: ['userId', 'recipeId'],
          properties: {
            userId: { type: 'string' },
            recipeId: { type: 'string' },
          },
        },
      },
    },
    paths: {
      '/api/recipes': {
        get: {
          summary: 'Get all recipes',
          tags: ['Recipes'],
          responses: {
            200: {
              description: 'List of recipes',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Recipe' },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Create a new recipe',
          tags: ['Recipes'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateRecipeRequest' },
              },
            },
          },
          responses: {
            201: { description: 'Recipe created successfully' },
            400: { description: 'Invalid input' },
          },
        },
      },
      '/api/recipes/{id}': {
        get: {
          summary: 'Get a recipe by ID',
          tags: ['Recipes'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Recipe data', content: { 'application/json': { schema: { $ref: '#/components/schemas/Recipe' }}}},
            404: { description: 'Recipe not found' },
          },
        },
        put: {
          summary: 'Update a recipe',
          tags: ['Recipes'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateRecipeRequest' },
              },
            },
          },
          responses: {
            200: { description: 'Recipe updated' },
            400: { description: 'Invalid input' },
            404: { description: 'Recipe not found' },
          },
        },
        delete: {
          summary: 'Delete a recipe',
          tags: ['Recipes'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Recipe deleted' },
            404: { description: 'Recipe not found' },
          },
        },
      },
      "/api/ingredients": {
        get: {
          summary: "Get all ingredients",
          tags: ["Ingredients"],
          responses: {
            "200": {
              description: "List of ingredients",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Ingredient" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Add a new ingredient",
          tags: ["Ingredients"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateIngredientRequest" },
              },
            },
          },
          responses: {
            "201": { description: "Ingredient added" },
            "400": { description: "Invalid input" },
          },
        },
      },
      "/api/ingredients/{id}": {
        get: {
          summary: "Get an ingredient by ID",
          tags: ["Ingredients"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": { description: "Ingredient data", content: { "application/json": { schema: { $ref: "#/components/schemas/Ingredient" }} }},
            "404": { description: "Ingredient not found" },
          },
        },
        put: {
          summary: "Update an ingredient",
          tags: ["Ingredients"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/CreateIngredientRequest" } } },
          },
          responses: {
            "200": { description: "Ingredient updated" },
            "404": { description: "Ingredient not found" },
            "400": { description: "Invalid input" },
          },
        },
        delete: {
          summary: "Delete an ingredient",
          tags: ["Ingredients"],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": { description: "Ingredient deleted" },
            "404": { description: "Ingredient not found" },
          },
        },
      },
      "/api/reviews": {
        get: {
          summary: "Get all reviews",
          tags: ["Reviews"],
          responses: {
            "200": {
              description: "List of reviews",
              content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Review" } } } },
            },
          },
        },
        post: {
          summary: "Add a new review",
          tags: ["Reviews"],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/CreateReviewRequest" } } },
          },
          responses: {
            "201": { description: "Review added" },
            "400": { description: "Invalid input" },
          },
        },
      },
      "/api/reviews/{id}": {
        get: {
          summary: "Get a review by ID",
          tags: ["Reviews"],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Review data", content: { "application/json": { schema: { $ref: "#/components/schemas/Review" } } } },
            "404": { description: "Review not found" },
          },
        },
        put: {
          summary: "Update a review",
          tags: ["Reviews"],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/CreateReviewRequest" } } },
          },
          responses: {
            "200": { description: "Review updated" },
            "404": { description: "Review not found" },
            "400": { description: "Invalid input" },
          },
        },
        delete: {
          summary: "Delete a review",
          tags: ["Reviews"],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Review deleted" },
            "404": { description: "Review not found" },
          },
        },
      },
      "/api/favorites": {
        get: {
          summary: "Get all favorites",
          tags: ["Favorites"],
          responses: {
            "200": {
              description: "List of favorites",
              content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Favorite" } } } },
            },
          },
        },
        post: {
          summary: "Add a new favorite",
          tags: ["Favorites"],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/CreateFavoriteRequest" } } },
          },
          responses: {
            "201": { description: "Favorite added" },
            "400": { description: "Invalid input" },
          },
        },
        delete: {
          summary: "Delete a favorite",
          tags: ["Favorites"],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Favorite deleted" },
            "404": { description: "Favorite not found" },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
