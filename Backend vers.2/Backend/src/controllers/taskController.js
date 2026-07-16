const taskService = require("../services/taskService");

const getAllTasks = async (req, res,next) => {
  try {
    const userId = req.user.user_id;
    const tasks = await taskService.getAllTasks(userId);
    return res.status(200).json(tasks);
  } catch (error) {
    next(error)
  }
};

const getTaskById = async (req, res,next) => {
  try {
    const userId = req.user.user_id;
    const { id: task_id } = req.params;
    const task = await taskService.getTaskById(taskId, userId);
    return res.status(200).json(task);
  } catch (error) {
    next(error)
  }
};

const createTask = async (req, res,next) => {
  try {
    const userId = req.user.user_id;
    const taskData = req.body;

    console.log("req.body:", req.body);

    const task = await taskService.createTask(userId, taskData);

    return res.status(201).json(task);
  } catch (error) {
    next(error)
  }
};

const updateTask = async (req, res,next) => {
  try {
    const userId = req.user.user_id;
    const { id: taskId } = req.params;
    const taskData = req.body;
    const task = await taskService.updateTask(taskId, userId, taskData);
    return res.status(200).json(task);
  } catch (error) {
    next(error)
  }
};

const deleteTask = async (req, res,next) => {
  try {
    const userId = req.user.user_id;
    const { id: taskId } = req.params;
    await taskService.deleteTask(taskId, userId);
    return res.status(204).send();
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};