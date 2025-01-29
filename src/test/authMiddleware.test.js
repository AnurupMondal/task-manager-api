const jwt = require("jsonwebtoken");
const authenticateToken = require("../../src/middlewares/authMiddleware");

jest.mock("jsonwebtoken"); // Mock JWT to avoid real token signing

describe("Auth Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test("Should return 401 if no token is provided", () => {
    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Access denied. No token provided." });
    expect(next).not.toHaveBeenCalled();
  });

  test("Should return 403 if token is invalid", () => {
    req.headers["authorization"] = "Bearer invalidtoken";
    jwt.verify.mockImplementation((token, secret, callback) => callback(new Error("Invalid token"), null));

    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid token." });
    expect(next).not.toHaveBeenCalled();
  });

  test("Should call next() if token is valid", () => {
    req.headers["authorization"] = "Bearer validtoken";
    const mockUser = { id: "123", name: "John Doe" };

    jwt.verify.mockImplementation((token, secret, callback) => callback(null, mockUser));

    authenticateToken(req, res, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });
});