# New Component Selected: Express-rate-limit (Rate Limiting)

I chose express-rate-limit as my new backend component. This adds rate limiting to the API, which helps protect the system from brute-force attempts and too many repeated requests.

## What I Already Built (Milestone 1)

In Milestone 1, I completed all the main backend setup:

### Layered Architecture
I used repository, service, and controller layers to keep everything clean and separated.

### Firebase Integration
I configured Firestore with both test and production environments.

### Validation System
I added Joi middleware so incoming data gets checked before it reaches the controllers.

### API Documentation
I added Swagger so anyone can read and understand the API easily.

### Testing Framework
I wrote Jest tests to check the main Recipe operations.

Along with this, I built the full Recipe API (CRUD) with proper error handling and Firebase integration.

## What I Plan to Add Now (New Component)

I decided to include rate limiting for the login and register routes. These endpoints are the most sensitive, so limiting the number of attempts will improve security and prevent abuse.

## Why I Chose This Component

I considered other components like Multer (file upload) or Nodemailer (email), but I chose rate limiting because:

- It improves the API’s security directly
- It fits perfectly with what I already built
- It’s simple enough to implement and test
- Real-world APIs use this in production services
- It’s clearly a “backend component,” not just another endpoint

## Implementation Plan

### Milestone 2

- Install the express-rate-limit package
- Create a separate middleware file
- Configure the limit (example: 5 attempts every 15 minutes)
- Apply it to /login and /register routes
- Write Jest tests for it
- Show a demo of how the limit blocks repeated requests

### Milestone 3

- Add Ingredients, Reviews, and Favorites resources
- Complete all CRUD endpoints for these resources
- Add proper validation and error handling
- Document every route in Swagger
- Add Jest tests for the new routes
- Expand the rate limiter to cover additional sensitive endpoints
- Make sure all existing routes follow a consistent structure

Why This Counts as a Real Backend Component

These resources introduce new database models, new routes, new validations, and full Swagger documentation.
They expand the API in a functional way, not cosmetic.
Together with improved rate limiting, this milestone adds real backend depth and a more complete API.

Current Status

Milestone 2 is completed.
Milestone 3 work will focus on implementing all remaining resources, documentation, and tests.
