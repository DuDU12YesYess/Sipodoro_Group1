const express = require("express")
const router = express.Router()

const flowerController = require ('../controllers/flowerController')
const authMiddleware = require ('../middleware/auth')

router.get("/current", authMiddleware, flowerController.getCurrentFlower)
router.post("/plant", authMiddleware, flowerController.plantSeed)
router.post("/store", authMiddleware, flowerController.storeInInventory)
router.delete("/:id", authMiddleware, flowerController.deleteFlower)

module.exports = router