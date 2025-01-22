const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const jsonParser = require("./middlewares/jsonParser");
const authenticateToken = require("./middlewares/authMiddleware");

const app = express();

// Middleware
app.use(jsonParser);

// Authentication routes
app.use("/api/auth", authRoutes);

// Protected task routes
app.use("/api", authenticateToken, taskRoutes);

// Swagger documentation
app.use("/api/tasks/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;