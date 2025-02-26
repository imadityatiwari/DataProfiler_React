require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());
app.use(cors());

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, email, org_name, password } = req.body;

    console.log(firstName, lastName, email, org_name, password);
    if (!firstName || !lastName || !email || !org_name || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (first_name, last_name, email, organization, password) VALUES ($1, $2, $3, $4, $5)",
      [firstName, lastName, email, organization, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and Password are required" });
  }

  // Simulated authentication
  if (username === "test" && password === "123456") {
    res.json({ message: "Login successful", token: "fake-jwt-token" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
