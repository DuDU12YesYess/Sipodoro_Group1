require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

/* ==========================
   GLOBAL MIDDLEWARE
========================== */

// Security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Compress response
app.use(compression());

// HTTP request logger
app.use(morgan("dev"));

// Parse JSON
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

/* ==========================
   HOME ROUTE
========================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Sipodoro API",
    version: "1.0.0",
  });
});

/* ==========================
   API ROUTES
========================== */

app.use("/api", routes);

/* ==========================
   404 NOT FOUND
========================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    error: {},
  });
});

/* ==========================
   GLOBAL ERROR HANDLER
========================== */

app.use(errorHandler);

module.exports = app;
