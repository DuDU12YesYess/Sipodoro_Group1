const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

module.exports = app;


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: {},
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;