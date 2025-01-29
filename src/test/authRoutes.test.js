const request = require("supertest");
const express = require("express");
const authRoutes = require("../routes/authRoutes");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken"); // Mock JWT to avoid real token signing

const app = express();
app.use(express.json()); // Enable JSON parsing for requests
app.use("/api/auth", authRoutes);

describe("Auth Routes", () => {
  test("Should return 400 if username or password is missing", async () => {
    const res = await request(app).post("/api/auth/login").send({ username: "admin" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Username and password are required.");
  });

  test("Should return 401 if credentials are incorrect", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "wronguser", password: "wrongpassword" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid credentials");
  });

  test("Should return 200 and a JWT token if credentials are correct", async () => {
    jwt.sign.mockReturnValue("mockedToken");

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "admin", password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token", "mockedToken");
  });
});