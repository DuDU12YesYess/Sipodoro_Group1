const express = require("express")
const router = express.Router()

const hydrationController = require("../controllers/hydrationController")
const authMiddleware = require("../middleware/auth")

// Hydration logs
router.post("/check-in", authMiddleware, hydrationController.checkIn)
router.get("/history", authMiddleware, hydrationController.getHistory)
module.exports = router;
