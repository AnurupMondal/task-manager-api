const jwt = require("jsonwebtoken");
require("dotenv").config();

// Dummy user database
const users = [
  { id: 1, username: "admin", password: "password123" },
  { id: 2, username: "user", password: "user123" }
];

// Login function to authenticate users and generate JWT token
exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};