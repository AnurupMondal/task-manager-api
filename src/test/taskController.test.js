const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/taskModel");
const taskController = require("../controllers/taskController");

jest.mock("../../src/models/taskModel"); // Mock Mongoose model

const app = express();
app.use(express.json());

// Mock routes
app.get("/api/tasks", taskController.getAllTasks);
app.get("/api/tasks/:id", taskController.getTaskById);
app.post("/api/tasks", taskController.createTask);
app.put("/api/tasks/:id", taskController.updateTask);
app.delete("/api/tasks/:id", taskController.deleteTask);

describe("Task Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should return paginated tasks", async () => {
    Task.find.mockResolvedValue([{ id: "1", title: "Task 1" }]);
    Task.countDocuments.mockResolvedValue(1);

    const res = await request(app).get("/api/tasks?page=1&limit=10");

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body).toHaveProperty("totalPages", 1);
  });

  test("Should return a task by ID", async () => {
    Task.findById.mockResolvedValue({ id: "1", title: "Task 1" });

    const res = await request(app).get("/api/tasks/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("title", "Task 1");
  });

  test("Should return 404 if task is not found", async () => {
    Task.findById.mockResolvedValue(null);

    const res = await request(app).get("/api/tasks/999");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Task not found");
  });

  test("Should create a new task", async () => {
    const newTask = { title: "New Task", description: "Test", status: "Pending" };
    Task.prototype.save.mockResolvedValue(newTask);

    const res = await request(app).post("/api/tasks").send(newTask);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("title", "New Task");
  });

  test("Should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/api/tasks").send({ title: "No Description" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "All fields are required");
  });

  test("Should update an existing task", async () => {
    Task.findByIdAndUpdate.mockResolvedValue({ id: "1", title: "Updated Task" });

    const res = await request(app).put("/api/tasks/1").send({ title: "Updated Task" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("title", "Updated Task");
  });

  test("Should return 404 if task to update is not found", async () => {
    Task.findByIdAndUpdate.mockResolvedValue(null);

    const res = await request(app).put("/api/tasks/999").send({ title: "Updated Task" });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Task not found");
  });

  test("Should delete a task", async () => {
    Task.findByIdAndDelete.mockResolvedValue({ id: "1" });

    const res = await request(app).delete("/api/tasks/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Task deleted successfully");
  });

  test("Should return 404 if task to delete is not found", async () => {
    Task.findByIdAndDelete.mockResolvedValue(null);

    const res = await request(app).delete("/api/tasks/999");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Task not found");
  });
});
