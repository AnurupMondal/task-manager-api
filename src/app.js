const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const jsonParser = require("./middlewares/jsonParser");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(jsonParser);

// Authentication routes
app.use("/api/auth", authRoutes);

// Task routes
app.use("/api/tasks/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;