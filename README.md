# Task Manager Application (MERN + Google OAuth)

A **full-stack Task Manager Application** built with the **MERN Stack** that allows users to securely manage their tasks.
Users can create tasks under different categories such as **Learning (progress tracking), Project (progress tracking), and Job (interview tracking)**.

The application supports **manual registration and login**, as well as **Google authentication**. 
**Existing users can connect their account with Google to seamlessly sync tasks with Google Calendar.**

This application includes:

- JWT-based authentication  
- Google OAuth 2.0 integration  
- Google Calendar account linking  
- User-specific task management  
- Protected REST APIs  
- Clean MVC backend architecture  

---

## Features

### Authentication & Authorization
- User Registration & Login using JWT
- Password hashing using bcrypt
- Protected routes using middleware
- Google OAuth 2.0 login & account linking
- Secure token-based authentication

### Task Management
- Create tasks
- View all tasks
- Update tasks
- Delete tasks
- User-specific task isolation
- Real-time UI updates after CRUD operations

### Google Integration
- Connect Google account
- Store Google access & refresh tokens
- Sync tasks with Google Calendar
- Prevent duplicate account linking
- Email mismatch validation

### Architecture
- MVC pattern (Backend)
- Centralized error handling
- Middleware-based authentication
- Environment variable configuration
- Component-based frontend structure

---

## Tech Stack

### Frontend
- ReactJS
- React Router DOM
- Axios / Fetch API
- Bootstrap
- JWT Decode

### Backend
- Node.js
- Express.js
- Passport.js (Google OAuth 2.0)
- JSON Web Tokens (JWT)
- Mongoose ODM

### Database
- MongoDB

### Tools
- Git & GitHub
- Postman
- VS Code
- NPM
- dotenv
