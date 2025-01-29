const request = require("supertest");
const express = require("express");
const jsonParser = require("../middlewares/jsonParser");

const app = express();
app.use(jsonParser);
app.post("/test", (req, res) => {
  res.json({ received: req.body });
});

describe("JSON Parser Middleware", () => {
  test("Should parse valid JSON body", async () => {
    const res = await request(app)
      .post("/test")
      .send({ message: "Hello" })
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ received: { message: "Hello" } });
  });

  test("Should return 400 Bad Request for invalid JSON", async () => {
    const res = await request(app)
      .post("/test")
      .send("{ invalidJson: true") // Malformed JSON
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});