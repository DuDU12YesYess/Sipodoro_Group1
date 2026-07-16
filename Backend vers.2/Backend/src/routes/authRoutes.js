const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// PUBLIC ROUTES (No middleware)
router.post('/register', authController.register);
router.post('/login', authController.login);

// PROTECTED ROUTES (Middleware added)
router.get('/profile', authMiddleware, authController.getProfile);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;