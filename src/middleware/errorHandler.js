
const { ValidationError, UniqueConstraintError } = require("sequelize");
const jwt = require("jsonwebtoken");

module.exports = (err, req, res, next) => {
  console.error(err);

  // Sequelize Validation Error
  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      message: "Database validation error",
      error: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Sequelize Unique Constraint
  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({
      success: false,
      message: "Duplicate value detected",
      error: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // JWT Error
  if (
    err instanceof jwt.JsonWebTokenError ||
    err instanceof jwt.TokenExpiredError
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: {},
    });
  }

  // Default Error
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error:
      process.env.NODE_ENV === "development"
        ? err
        : {},
  });
};
