const express = require("express");
const router = express.Router();

const seedInventoryController = require("../controllers/seedInventoryController");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, seedInventoryController.getInventory)
router.get("/:seedId", authMiddleware, seedInventoryController.getSeed)

module.exports = router;
