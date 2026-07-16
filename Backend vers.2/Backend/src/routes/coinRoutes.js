const express = require("express")
const router = express.Router()

const coinController = require("../controllers/coinController")
const authMiddleware = require("../middleware/auth")

router.get("/wallet", authMiddleware, coinController.getWallet)
router.get("/transactions", authMiddleware, coinController.getTransactions)

module.exports = router