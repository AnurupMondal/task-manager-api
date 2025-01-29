const mongoose = require("mongoose");
const Task = require("../../src/models/taskModel");

describe("Task Model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Task.deleteMany({});
  });

  test("Should create a task successfully", async () => {
    const task = new Task({
      title: "Test Task",
      description: "This is a test task",
      status: "pending",
    });

    const savedTask = await task.save();

    expect(savedTask._id).toBeDefined();
    expect(savedTask.title).toBe("Test Task");
    expect(savedTask.description).toBe("This is a test task");
    expect(savedTask.status).toBe("pending");
    expect(savedTask.created_at).toBeDefined();
    expect(savedTask.updated_at).toBeDefined();
  });

  test("Should require title and description", async () => {
    const task = new Task({});

    let err;
    try {
      await task.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.title).toBeDefined();
    expect(err.errors.description).toBeDefined();
  });

  test("Should only allow valid status values", async () => {
    const task = new Task({
      title: "Invalid Status Task",
      description: "Trying an invalid status",
      status: "invalid-status",
    });

    let err;
    try {
      await task.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.status).toBeDefined();
  });

  test("Should set default values for status and timestamps", async () => {
    const task = new Task({
      title: "Default Task",
      description: "Task with default values",
    });

    const savedTask = await task.save();

    expect(savedTask.status).toBe("pending");
    expect(savedTask.created_at).toBeDefined();
    expect(savedTask.updated_at).toBeDefined();
  });
});