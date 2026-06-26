const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/auth");

// Task CRUD
router.get("/", authMiddleware, taskController.getAllTasks);
router.get("/:id", authMiddleware, taskController.getTaskById);
router.post("/", authMiddleware, taskController.createTask);
router.put("/:id", authMiddleware, taskController.updateTask);
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;