# Indian Recipe API

A Node.js + TypeScript + Express API for managing Indian recipes, built with Firebase Admin SDK for authentication and Firestore for data storage.

## Features

- User authentication with JWT tokens
- Recipe management (CRUD operations)
- Ingredient management
- Review system
- Favorites functionality
- Search recipes by ingredient
- Role-based access control (user/admin)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/3018-BED-Project_Milestones.git
cd 3018-BED-Project_Milestones
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Copy `.env.example` to `.env` and fill in your Firebase credentials:
```bash
cp .env.example .env
```

Required environment variables:
- `FIREBASE_PROJECT_ID`: Your Firebase project ID
- `FIREBASE_PRIVATE_KEY`: Your Firebase service account private key
- `FIREBASE_CLIENT_EMAIL`: Your Firebase service account email
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 3000)
- `JWT_SECRET`: Secret key for JWT token signing

4. Set up Firebase:
- Create a Firebase project
- Enable Firestore
- Create a service account and download the key file as `securityAccountkey.json`

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run serve
```

## Running Tests

```bash
npm test
```

## Running Firebase Emulator

```bash
npm run emulator
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running.

### Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### Register a new user
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "uid": "firebase-uid",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### Recipes

#### Get all recipes
```http
GET /api/recipes
```

#### Get recipe by ID
```http
GET /api/recipes/{id}
```

#### Create a recipe (Protected)
```http
POST /api/recipes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Butter Chicken",
  "description": "Creamy and delicious Indian curry",
  "ingredients": ["chicken", "butter", "cream", "spices"],
  "instructions": "1. Marinate chicken... 2. Cook in butter...",
  "cookingTime": 45,
  "servings": 4,
  "difficulty": "medium",
  "cuisine": "Indian"
}
```

#### Update a recipe (Protected)
```http
PUT /api/recipes/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Butter Chicken"
}
```

#### Delete a recipe (Protected)
```http
DELETE /api/recipes/{id}
Authorization: Bearer <token>
```

#### Search recipes by ingredient
```http
GET /api/recipes/search?ingredient=chicken
```

### Ingredients

#### Get all ingredients
```http
GET /api/ingredients
```

#### Get ingredient by ID
```http
GET /api/ingredients/{id}
```

#### Get ingredients by recipe ID
```http
GET /api/ingredients/recipe/{recipeId}
```

#### Create an ingredient (Protected)
```http
POST /api/ingredients
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Chicken",
  "quantity": "500g",
  "recipeId": "recipe-id"
}
```

#### Update an ingredient (Protected)
```http
PUT /api/ingredients/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": "600g"
}
```

#### Delete an ingredient (Protected)
```http
DELETE /api/ingredients/{id}
Authorization: Bearer <token>
```

### Reviews

#### Get all reviews
```http
GET /api/reviews
```

#### Get review by ID
```http
GET /api/reviews/{id}
```

#### Get reviews by recipe ID
```http
GET /api/reviews/recipe/{recipeId}
```

#### Create a review (Protected)
```http
POST /api/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "recipeId": "recipe-id",
  "rating": 5,
  "comment": "Amazing recipe!"
}
```

#### Update a review (Protected)
```http
PUT /api/reviews/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4,
  "comment": "Good recipe"
}
```

#### Delete a review (Protected)
```http
DELETE /api/reviews/{id}
Authorization: Bearer <token>
```

### Favorites

#### Get all favorites
```http
GET /api/favorites
```

#### Get favorite by ID
```http
GET /api/favorites/{id}
```

#### Create a favorite (Protected)
```http
POST /api/favorites
Authorization: Bearer <token>
Content-Type: application/json

{
  "recipeId": "recipe-id",
  "userId": "user-id"
}
```

#### Update a favorite (Protected)
```http
PUT /api/favorites/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "recipeId": "new-recipe-id"
}
```

#### Delete a favorite (Protected)
```http
DELETE /api/favorites/{id}
Authorization: Bearer <token>
```

## Error Responses

- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Contributing / Git Workflow

### Branch Structure
- `main`: Production-ready code
- `development`: Active development branch
- `feature/*`: Feature branches (e.g., `feature/auth`, `feature/search`)

### Commit Messages
Use clear, descriptive commit messages:
- "Add JWT authentication and auth middleware"
- "Protect recipe routes using token middleware"
- "Improve README with full API docs"
- "Add advanced feature: recipe search by ingredient"

### Workflow
1. Create a feature branch from `development`:
   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/your-feature-name
   ```

2. Make changes and commit:
   ```bash
   git add .
   git commit -m "Add your descriptive commit message"
   ```

3. Push and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Merge into `development` after review

5. When ready for production, merge `development` into `main`

## Project Structure

```
src/
├── controllers/     # Request handlers
├── services/        # Business logic
├── repositories/    # Data access layer
├── routes/          # API routes
├── middleware/      # Custom middleware
├── models/          # TypeScript interfaces
├── config/          # Configuration files
└── docs/            # API documentation
```

## Technologies Used

- Node.js
- TypeScript
- Express.js
- Firebase Admin SDK
- Firestore
- JWT for authentication
- Joi for validation
- Swagger for API documentation
- Jest for testing
