const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController");
const authMiddleware = require("../middlewares/authMiddleware");

// Buy seed
router.post("/buy", authMiddleware, shopController.buySeed);

// Transaction history
router.get("/history", authMiddleware, shopController.getTransactionHistory);

//FLOWER MANAGEMENT (ADMIN STYLE)
router.post("/flower", authMiddleware, shopController.addFlower);
router.put("/flower/:id", authMiddleware, shopController.updateFlower);
router.delete("/flower/:id", authMiddleware, shopController.deleteFlower);

module.exports = router;
