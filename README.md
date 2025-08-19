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

- **Frontend:** React, TypeScript, React Hook Form
- **Backend:** Node.js, Express
- **Database:** (MongoDB)
- **Other:** Vite, Git

---

## Setup Instructions

1. Clone the repository:
```
git clone <repo-url>
cd root
```
3. Create .env file (based on .env.example) with your database connection and other secrets

1. Go to the backend folder:
`cd backend`

2. Install dependencies:
`npm install`

5. Frontend
Go to the frontend folder:
```cd ..
cd frontend
```

6. Install dependencies:
`npm install`

4. Start backend:
```
cd ..
cd backend
npm run dev
```

7. Start frontend:
``` cd .. 
cd frontend
npm run dev
```

## Assumptions
Backend runs on http://localhost:5050

Frontend runs on http://localhost:5173 (default Vite port)

Images are stored in backend/uploads and are committed to Git in this test project (so reviewers can see them)

.env files contain sensitive info and are ignored by Git

Frontend communicates with backend via REST API calls

Both backend and frontend must be running simultaneously for the app to work

## Notes
Async operations are handled with proper error handling

Components are reusable and organized for maintainability

The app is responsive and handles both creating and editing superheroes

Pagination shows 5 items per page

New images can be uploaded and previewed before submitting