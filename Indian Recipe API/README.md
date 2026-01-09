# Indian Recipe API

Hey, I'm Khush Patel, a student in the Back-End Development course (COMP-3018), and this is my final project. I built an API for managing Indian recipes using Node.js, TypeScript, and Firebase. It includes user authentication, CRUD operations for recipes, ingredients, reviews, and favorites, plus some extra features like rate limiting.

## Features

- Full CRUD for recipes (create, read, update, delete)
- User registration and login with Firebase Auth
- Add ingredients to recipes
- Leave reviews and ratings on recipes
- Save favorite recipes
- Rate limiting on sensitive endpoints
- Input validation with Joi
- API documentation with Swagger
- Testing with Jest
- CI/CD with GitHub Actions

## Tech Stack

- Node.js with Express.js
- TypeScript
- Firebase Firestore and Auth
- JWT for authentication
- Joi for validation
- Swagger for API docs
- Jest for testing
- ESLint for linting

## Installation

1. Clone the repository:
   
   git clone https://github.com/your-username/3018-recipe-api.git
   cd 3018-recipe-api
   

2. Install dependencies:

   npm install
   

3. Set up Firebase:
   - Create a Firebase project
   - Enable Firestore and Authentication
   - Download the service account key and save as `src/securityAccountkey.json`
   - Create a `.env` file with:
     
     PORT=3000
     NODE_ENV=development
     JWT_SECRET=your-secret-key
     

4. Run the app:

   npm run dev


## Usage

Start the server with `npm run dev`. The API will be at http://localhost:3000.

- Health check: http://localhost:3000/health
- API docs: http://localhost:3000/api-docs

### Example API Calls

Register a user:

POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123"
}


Create a recipe (requires auth token):

POST /api/recipes
Authorization: Bearer YOUR_JWT_TOKEN
{
  "title": "Butter Chicken",
  "description": "Creamy Indian curry",
  "cookingTime": 45,
  "difficulty": "Medium",
  "cuisineType": "Indian"
}


## API Endpoints

- `GET /api/recipes` - Get all recipes (paginated)
- `POST /api/recipes` - Create recipe
- `GET /api/recipes/:id` - Get recipe by ID
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe (admin only)
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/ingredients` - Get ingredients
- `POST /api/ingredients` - Add ingredient
- `GET /api/reviews` - Get reviews
- `POST /api/reviews` - Add review
- `GET /api/favorites` - Get favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:id` - Remove favorite

## Testing

Run tests with:

npm test


Includes tests for user auth, recipes, and rate limiting.

## Deployment

Build for production:

npm run build
npm run serve


Set environment variables for production Firebase and JWT.
