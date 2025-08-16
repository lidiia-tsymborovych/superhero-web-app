# Superhero Web App

A full-stack web application for managing a superhero database.  
You can create, edit, delete, and view superheroes with multiple images.

---

## Project Structure
```
root/
├─ backend/ # Node.js + Express backend
├─ frontend/ # React frontend
└─ README.md # This file
```
---

## Features

- **CRUD operations**: Create, edit, and delete a superhero
- **Image management**: Upload new images, preview before submitting, delete existing images
- **Pagination**: List superheroes 5 per page
- **Superhero details**: View full information and all images for a superhero
- **Form validation**: Required fields are validated before submit

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React Hook Form
- **Backend:** Node.js, Express
- **Database:** (your choice, e.g., MongoDB)
- **Other:** Vite, Git

---

## Setup Instructions

### Backend

1. Go to the backend folder:
`cd backend`

2. Install dependencies:
`npm install`

3. Create .env file (based on .env.example) with your database connection and other secrets

4. Start backend:
`npm run dev`

5. Frontend
Go to the frontend folder:
`cd frontend`

6. Install dependencies:
`npm install`

7. Start frontend:
`npm run dev`

## Assumptions
Images are stored in backend/uploads and ignored by Git

.env files contain sensitive information and are ignored by Git

Backend is assumed to run on http://localhost:5050

The frontend communicates with the backend via REST API calls

## Notes
Async operations are handled with proper error handling

Components are reusable and organized for maintainability

The app is responsive and handles both creating and editing superheroes

Pagination shows 5 items per page

New images can be uploaded and previewed before submitting