const express = require("express");
const router = express.Router();

const pomodoroController = require("../controllers/pomodoroController");
const authMiddleware = require("../middleware/auth");

// Pomodoro cycle
router.post("/start", authMiddleware, pomodoroController.startCycle);
router.put("/end/:id", authMiddleware, pomodoroController.endCycle);
router.get("/history", authMiddleware, pomodoroController.getUserCycles);

module.exports = router;