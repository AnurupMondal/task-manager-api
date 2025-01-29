const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Task = require("../models/taskModel");

describe("Task Routes", () => {
  let taskId;

  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Task.deleteMany({});
    const task = await Task.create({
      title: "Test Task",
      description: "Test Description",
      status: "pending",
    });
    taskId = task._id;
  });

  test("GET /tasks - should return all tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test("GET /tasks/:id - should return a task by ID", async () => {
    const res = await request(app).get(`/api/tasks/${taskId}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Test Task");
  });

  test("POST /tasks - should create a new task", async () => {
    const newTask = {
      title: "New Task",
      description: "New Task Description",
      status: "in-progress",
    };

    const res = await request(app).post("/api/tasks").send(newTask);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newTask.title);
  });

  test("PUT /tasks/:id - should update a task", async () => {
    const updatedTask = {
      title: "Updated Task",
      description: "Updated Description",
      status: "completed",
    };

    const res = await request(app).put(`/api/tasks/${taskId}`).send(updatedTask);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updatedTask.title);
  });

  test("DELETE /tasks/:id - should delete a task", async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task deleted successfully");
  });
});