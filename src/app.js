const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const jsonParser = require("./middlewares/jsonParser"); // Import the middleware

const app = express();

// Middleware
app.use(jsonParser); // Use the extracted middleware

// Routes
app.use("/api/tasks/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger docs
app.use("/api", taskRoutes); // Task routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;