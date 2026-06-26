
const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
        error: {},
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findByPk(decoded.user_id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
        error: {},
      });
    }

    req.user = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      role: decoded.role || "user",
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
