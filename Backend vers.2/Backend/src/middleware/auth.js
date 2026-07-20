const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("DEBUG: Access token missing or invalid format");
      return res.status(401).json({
        success: false,
        message: "Access token is required",
        error: {},
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "FIXED_SECRET_KEY_FOR_TESTING"
    );

    const user = await User.findByPk(decoded.user_id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      console.log("DEBUG: User not found in database for ID:", decoded.user_id);
      return res.status(401).json({
        success: false,
        message: "User not found",
        error: {},
      });
    }

    //assigning to req.user
    req.user = {
      user_id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    //debug log
    console.log("DEBUG: Auth Middleware - User found:", req.user.username);
    console.log("DEBUG: Auth Middleware - Role assigned:", req.user.role);

    next();
  } catch (error) {
    console.log("DEBUG: Auth Middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};