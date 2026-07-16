// src/controllers/authController.js
const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    console.log("Register request body:", req.body);
    const result = await authService.register(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Register error:", error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    console.log("Login request body:", req.body);
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    // Returns the user data attached by authMiddleware
    return res.status(200).json({ 
      success: true, 
      user: req.user 
    });
  } catch (error) {
    console.error("Profile error:", error);
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    // In a JWT-based system, logout is typically handled 
    // by the client deleting the token from localStorage
    return res.status(200).json({ 
      success: true, 
      message: "Logged out successfully" 
    });
  } catch (error) {
    console.error("Logout error:", error);
    next(error);
  }
};

module.exports = { 
  register, 
  login, 
  getProfile, 
  logout 
};