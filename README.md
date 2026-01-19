# Full-Stack Application

This project consists of a Next.js frontend and an Express.js backend with JWT authentication and task management.

## Frontend

Located in the `frontend/` directory. Uses Next.js with the App Router and TailwindCSS for styling.

## Backend

Located in the `backend/` directory. Uses Express.js with MongoDB for data storage.

## Getting Started

1. Install dependencies for both frontend and backend:
   ```
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. Set up MongoDB and update `backend/.env` with your MongoDB URI.

3. Start the backend server:
   ```
   cd backend && npm run dev
   ```

4. Start the frontend development server:
   ```
   cd frontend && npm run dev
   ```

5. Open http://localhost:3000 in your browser.

## Features

- User registration and login with JWT authentication
- Protected dashboard routes
- User profile management
- CRUD operations on tasks
- Search and filter tasks
- Responsive design

## API Documentation

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### User
- GET /api/user/profile - Get user profile (requires auth)
- PUT /api/user/profile - Update user profile (requires auth)

### Tasks
- GET /api/tasks - Get all user tasks (requires auth)
- POST /api/tasks - Create a new task (requires auth)
- PUT /api/tasks/:id - Update a task (requires auth)
- DELETE /api/tasks/:id - Delete a task (requires auth)

## Scalability Note

To scale the frontend-backend integration for production:

1. **API Gateway**: Implement an API gateway (e.g., Kong, AWS API Gateway) to handle routing, rate limiting, and authentication.

2. **Microservices**: Break down the backend into microservices (auth service, user service, task service) for better scalability.

3. **Database**: Use a managed database service like MongoDB Atlas or AWS DocumentDB. Implement database sharding and read replicas.

4. **Caching**: Add Redis for caching frequently accessed data and session storage.

5. **Load Balancing**: Use load balancers to distribute traffic across multiple server instances.

6. **CDN**: Serve static assets via a CDN for faster global delivery.

7. **Monitoring**: Implement logging, monitoring, and alerting with tools like ELK stack or Datadog.

8. **Containerization**: Use Docker and Kubernetes for container orchestration and auto-scaling.

9. **Security**: Implement HTTPS, rate limiting, input validation, and regular security audits.

10. **Performance**: Optimize database queries, implement pagination, and use lazy loading for better performance.