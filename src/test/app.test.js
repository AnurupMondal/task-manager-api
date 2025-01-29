const request = require("supertest");
const app = require("../app");

describe("Task Manager API", () => {
  test("Server should be running", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(404); // Since there's no route for "/", it should return 404
  });

  test("GET /api/tasks/docs should serve Swagger UI", async () => {
    const res = await request(app).get("/api/tasks/docs");
    expect(res.statusCode).toBe(200);
  });

  test("POST /api/auth/login should fail without credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect(res.statusCode).toBe(400); // Assuming it requires credentials
    expect(res.body).toHaveProperty("message");
  });

  test("POST /api/tasks should fail without authentication", async () => {
    const newTask = { title: "Test Task", description: "Test Description", status: "pending" };
    const res = await request(app).post("/api/tasks").send(newTask);
    expect(res.statusCode).toBe(401); // Assuming authentication is required
  });

  test("GET /api/tasks should return 401 if unauthorized", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(401); // Unauthorized access should be blocked
  });
});