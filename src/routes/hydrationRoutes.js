const express = require("express");
const router = express.Router();

const hydrationController = require("../controllers/hydrationController");
const authMiddleware = require("../middleware/auth");

// Hydration logs
router.post("/checkin", authMiddleware, hydrationController.addHydrationLog);
router.get("/", authMiddleware, hydrationController.getHydrationLogs);

module.exports = router;