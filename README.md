# Authentication System

A Node.js + Express authentication API with MongoDB, JWT access/refresh tokens, password hashing, and protected routes.

## Features
- User registration and login
- JWT access and refresh tokens
- Protected profile route
- Refresh token support via cookie
- Role-based authorization middleware

## Setup
1. Install dependencies: npm install
2. Start MongoDB locally
3. Create a .env file with your configuration
4. Run the server: npm run dev

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/profile
- POST /api/auth/refresh

## Testing
- npm test
