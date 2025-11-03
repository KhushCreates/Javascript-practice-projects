# COMP-3018 – Pre-Milestone Project Planning

**Name:** Khush Patel  
**Course:** Back-End Development  
**Date:** November 3, 2025  

## 1. Project Concept

**Project Title:** Recipe Management API  

**Purpose:**  
So, I’m planning to build a back-end API for managing recipes, ingredients, reviews, and favorite recipes. Basically, users can add, update, delete, and see recipes and ingredients. They can also leave reviews and save recipes they like.  

**Why I chose this project:**  
- I thought it’s something real and not too hard for a student project.  
- Covers all the stuff we learned like Node.js, Express, TypeScript, Firebase Auth, Firestore.  
- I’m adding a favorites feature too, just to try something extra and show I did a bit of research.  
- Main goal: make it simple and organized so users can manage recipes without messing things up.  

## 2. Scope & Functionality

**Main Resources:**  

1. **Users** – login info, roles (admin/user) (handled with Firebase Auth)  
2. **Recipes** – title, description, steps, createdBy  
3. **Ingredients** – name, quantity, recipeId  
4. **Reviews** – rating, comment, recipeId, userId  
5. **Favorites** – recipeId, userId (this is my extra feature)  

**Planned Endpoints:**  

**Users**  
- `POST /register` – to create a new account  
- `POST /login` – login  

**Recipes**  
- `GET /recipes` – get all recipes  
- `POST /recipes` – add a new recipe  
- `GET /recipes/:id` – get a single recipe  
- `PUT /recipes/:id` – update a recipe  
- `DELETE /recipes/:id` – delete a recipe  

**Ingredients**  
- `GET /ingredients` – list all ingredients  
- `POST /ingredients` – add ingredient to a recipe  

**Reviews**  
- `GET /reviews` – see reviews for a recipe  
- `POST /reviews` – add a review  

**Favorites**  
- `GET /favorites` – see my favorite recipes  
- `POST /favorites` – add a recipe to favorites  

**Planned Features:**  
- CRUD for Recipes, Ingredients, Reviews (basically full CRUD)  
- Firebase Auth + roles (admin/user)  
- Favorites system (extra thing)  
- Firestore database  
- Data validation using Joi + error handling  
- Swagger docs for API  
- Jest testing  

## 3. Course Content Alignment

- **Node.js + TypeScript** – used for backend logic, nothing extra  
- **Express routes/controllers** – for REST API, nothing extra  
- **Firestore DB** – stores recipes, ingredients, reviews  
- **Firebase Auth** – login and roles  
- **Jest tests** – testing routes and logic  
- **Swagger** – API documentation  
- **Joi validation** – checking inputs  
- **Favorites feature** – optional extra/research component outside the usual course stuff  

## 4. GitHub Project Setup

**Repo:** `3018-recipe-api`  

**Branches:**  
- `main` – for final code  
- `development` – for work in progress  
- `feature/<issue-name>` – each task gets its own branch  

**Project Board:** Columns – Backlog | In Progress | Review | Done  

**Sample Tasks:**  
1. Setup project + TS config  
2. Setup Firebase Auth  
3. Create Recipe model + endpoints  
4. Create Ingredient model + endpoints  
5. Create Review model + endpoints  
6. Add Favorites feature  
7. Setup Swagger docs  
8. Add Jest tests  
9. CI workflow for lint + tests  
10. Final cleanup  

**Pull Requests:**  
- Features merge into `development` first  
- After testing, `development` merges into `main`  

## 5. Summary

So yeah, this project will make a simple, organized back-end API for recipes. It has authentication, role-based access, full CRUD, and a little extra with the favorites feature. The GitHub board and tasks are ready so I can start Milestone 1 without any mess.  

**Submitted by:** Khush Patel  
**Date:** November 3, 2025
