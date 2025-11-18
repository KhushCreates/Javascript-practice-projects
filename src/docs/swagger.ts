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
          required: ['id', 'name', 'ingredients', 'instructions', 'cookingTime', 'servings'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier for the recipe'
            },
            name: {
              type: 'string',
              description: 'Name of the recipe'
            },
            ingredients: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'List of ingredients'
            },
            instructions: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Step-by-step cooking instructions'
            },
            cookingTime: {
              type: 'number',
              description: 'Cooking time in minutes'
            },
            servings: {
              type: 'number',
              description: 'Number of servings'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        CreateRecipeRequest: {
          type: 'object',
          required: ['name', 'ingredients', 'instructions', 'cookingTime', 'servings'],
          properties: {
            name: {
              type: 'string',
              description: 'Name of the recipe'
            },
            ingredients: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'List of ingredients'
            },
            instructions: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Step-by-step cooking instructions'
            },
            cookingTime: {
              type: 'number',
              description: 'Cooking time in minutes'
            },
            servings: {
              type: 'number',
              description: 'Number of servings'
            }
          }
        },
        UpdateRecipeRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the recipe'
            },
            ingredients: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'List of ingredients'
            },
            instructions: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Step-by-step cooking instructions'
            },
            cookingTime: {
              type: 'number',
              description: 'Cooking time in minutes'
            },
            servings: {
              type: 'number',
              description: 'Number of servings'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'], // path to the API routes
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};