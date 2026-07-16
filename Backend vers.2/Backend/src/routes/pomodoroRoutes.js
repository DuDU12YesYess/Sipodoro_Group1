const express = require("express");
const router = express.Router();

const pomodoroController = require("../controllers/pomodoroController");
const authMiddleware = require("../middleware/auth");

// Pomodoro cycle
router.post("/start", authMiddleware, pomodoroController.startCycle);
router.post("/focus-complete/:cycleId", authMiddleware, pomodoroController.comepleteFocusSession);
router.post("/break-complete/:cycleId", authMiddleware, pomodoroController.comepleteBreak);
router.get("/history", authMiddleware, pomodoroController.getHistory);


module.exports = router;
