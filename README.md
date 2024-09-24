# Task Management System

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
   - [Frontend](#frontend)
   - [Backend](#backend)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Running the Application Locally](#running-the-application-locally)
   - [Running the Backend](#running-the-backend)
   - [Running the Frontend](#running-the-frontend)
7. [API Endpoints](#api-endpoints)
8. [Folder Structure](#folder-structure)
9. [Environment Variables](#environment-variables)
10. [Scripts](#scripts)
11. [Contributing](#contributing)
12. [License](#license)

---

## Project Overview
The **Task Management System** is a web application designed to simplify task management. It enables users to create, update, organize, and track tasks, making project management more efficient. The application includes user authentication, task categorization, and deadlines, all managed through a responsive interface built with React and Material UI, and powered by a Node.js and Express backend with MongoDB for data storage.

## Features
- User Registration and Login (JWT-based)
- Task Creation, Update, and Deletion
- Task Categorization (e.g., To-Do, In Progress, Completed)
- Task Deadline Tracking
- Responsive UI with Material UI
- RESTful API for managing tasks
- Redux for global state management

## Tech Stack

### Frontend
- **React** (v18.3.1) – for building dynamic user interfaces.
- **Redux Toolkit** (v2.2.7) – for state management.
- **React Router DOM** (v6.26.2) – for navigation.
- **Axios** (v1.7.7) – for making HTTP requests to the backend.
- **Material UI** (v6.1.1) – for UI components and styling.
- **Emotion** – for styling components.
- **Tailwind CSS** (v3.4.12) – for utility-based styling.
- **Vite** – for bundling and running the frontend development server.

### Backend
- **Node.js** – for building the backend.
- **Express** (v4.21.0) – for API routing.
- **MongoDB** (via Mongoose v8.6.3) – for database management.
- **JWT** (v9.0.2) – for user authentication.
- **BcryptJS** (v2.4.3) – for password hashing.
- **Cors** (v2.8.5) – for enabling Cross-Origin Resource Sharing.
- **Dotenv** (v16.4.5) – for environment variable management.
- **Morgan** (v1.10.0) – for HTTP request logging.

## Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (>= 14.x)
- **npm** or **yarn**
- **MongoDB** (running locally or hosted on MongoDB Atlas)
- **Git** (optional, for version control)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/task-management-system.git
cd task-management-system

Frontend:
cd client-task-management
npm install

Backend:
cd server
npm install
```
Running the Application Locally
Running the Backend
Ensure MongoDB is running locally or set up a MongoDB Atlas connection.

Set up your environment variables by creating a .env file in the server/ directory. Use the following template:

MONGO_URI=mongodb://localhost:27017/task_management
JWT_SECRET=your_jwt_secret
PORT=5000

Start the backend server with Nodemon (for auto-reloading):
cd server
npm run dev
The backend server will run on http://localhost:5000.

Running the Frontend
Start the frontend development server using Vite:

cd client-task-management
npm run dev
The frontend will be available at http://localhost:3000.



## Accessing the App
Once both servers are running, open your browser and navigate to:

http://localhost:3000
The frontend will make API requests to the backend running on http://localhost:5000.

## API Endpoints
Here are the available API endpoints in the backend:

### Authentication
POST /api/auth/register – Register a new user.
POST /api/auth/login – Authenticate and log in a user.

### Tasks
GET /api/tasks – Get all tasks for the authenticated user.
POST /api/tasks – Create a new task.
PUT /api/tasks/:id – Update a task by ID.
DELETE /api/tasks/:id – Delete a task by ID.
