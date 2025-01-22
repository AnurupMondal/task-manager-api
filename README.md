# Task Manager API

Task Manager API is a simple RESTful API that allows users to manage tasks efficiently with CRUD operations. The API is built using **Node.js**, **Express.js**, and **MongoDB**, with JWT-based authentication and Swagger documentation.

---

## Features

- User Authentication (JWT)
- Task Management (CRUD Operations)
- Task Status Management (`pending`, `in-progress`, `completed`)
- Pagination Support
- API Documentation with Swagger UI
- Error Handling & Validation

---

## Technologies Used

- **Node.js** - Backend runtime environment
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database for storing tasks
- **Mongoose** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Authentication mechanism
- **Swagger UI** - API documentation
- **dotenv** - Environment variable management
- **Nodemon** - Auto-restart development server

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (latest LTS version recommended)
- **MongoDB** (local or cloud instance)
- **Postman** (for API testing)

---

### Setup Instructions

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory:**

   ```plaintext
   PORT=3000
   MONGO_URI=mongodb+srv://root:password@cluster.mongodb.net/tasksDB?retryWrites=true&w=majority
   JWT_SECRET=your_secret_key
   ```

4. **Start the server:**

   ```bash
   npm run dev
   ```

5. **Access the API documentation:**

   ```
   http://localhost:3000/api/tasks/docs
   ```

---

## API Endpoints

### Authentication

| Method | Endpoint       | Description              | Auth Required |
|--------|---------------|--------------------------|---------------|
| POST   | `/api/auth/login` | User login and get JWT token | No            |

#### Request Body:

```json
{
  "username": "admin",
  "password": "password123"
}
```

#### Response Example:

```json
{
  "token": "your_generated_jwt_token"
}
```

---

### Task Management

| Method | Endpoint         | Description                | Auth Required |
|--------|-----------------|----------------------------|---------------|
| GET    | `/api/tasks`     | Get all tasks (paginated)   | Yes           |
| GET    | `/api/tasks/{id}` | Get a task by ID            | Yes           |
| POST   | `/api/tasks`     | Create a new task           | Yes           |
| PUT    | `/api/tasks/{id}` | Update an existing task     | Yes           |
| DELETE | `/api/tasks/{id}` | Delete a task               | Yes           |

#### Task Object Example:

```json
{
  "title": "Complete Project",
  "description": "Finish the final report",
  "status": "in-progress"
}
```

#### Task Status Options:

```
- pending
- in-progress
- completed
```

---

## Pagination

Tasks can be retrieved with pagination support using query parameters:

```
GET /api/tasks?page=1&limit=10
```

#### Query Parameters:

```
page  - The page number (default: 1)
limit - The number of tasks per page (default: 10)
```

---

## Running the Project in Development Mode

```bash
npm run dev
```

---

## Running the Project in Production Mode

```bash
npm start
```

---

## Project Structure

```
task-manager-api/
│-- src/
│   ├── controllers/
│   │   ├── taskController.js
│   │   ├── authController.js
│   ├── routes/
│   │   ├── taskRoutes.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   ├── config/
│   │   ├── db.js
│   ├── app.js
│   ├── swagger.js
│-- .env
│-- package.json
│-- README.md
```

---

## Authentication

All protected routes require a valid JWT token to be provided in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Tools Used

- **Postman** - To test the API endpoints
- **Swagger UI** - To document and test API functionality
- **MongoDB Atlas** - Cloud database to store tasks
- **Nodemon** - For automatic server restarts in development

---

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push your branch and submit a pull request.

---

## License

This project is licensed under the MIT License.