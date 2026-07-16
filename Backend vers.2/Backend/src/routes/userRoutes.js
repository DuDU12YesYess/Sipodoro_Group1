const express = require ("express")
const router = express.Router()

const userController = require ('../controllers/userController')
const authMiddleware = require ('../middleware/auth')

//Get logged in user pf
router.get("/profile", authMiddleware, userController.getProfile)

//Update their pf 
router.put("/profile", authMiddleware, userController.updateProfile)

module.exports = router
