const express = require("express");
const router = express.Router();

const gardenController = require("../controllers/gardenController");
const authMiddleware = require("../middleware/auth");

//view garden
router.get("/", authMiddleware, gardenController.getGarden);

//move bloomed flower to garden
router.post("/add", authMiddleware, gardenController.addFlowerToGarden);

module.exports = router;