const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
module.exports = router;const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// User update (CRUD-style admin/user management)
router.put("/update/:id", authMiddleware, authController.updateUser);
router.delete("/update/:id", authMiddleware, authController.deleteUser);

module.exports = router;
