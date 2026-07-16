const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController");
const authMiddleware = require("../middleware/auth");

// Buy seeds
router.post("/buy", authMiddleware, shopController.buySeed);

module.exports = router;