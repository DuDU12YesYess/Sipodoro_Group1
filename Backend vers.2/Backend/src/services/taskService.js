const taskRepository = require("../repository/taskRepository");

const getAllTasks = async (userId) => {
  return await taskRepository.getAllTasks(userId);
  
};

const getTaskById = async (taskId, userId) => {
    const task = await taskRepository.getTaskById(taskId, userId);
    if (!task) {
        const error = new Error('Task not found')
        error.status = 404
        throw error
    }
    return task;
};

const createTask = async (userId, taskData) => {
  console.log("userId:", userId);
  console.log("taskData:", taskData);
  const {title,deadline,status,completed = false} = taskData;
  if (!title) {
      const error = new Error('Task title is required')
      error.status = 401
      throw error
  }
  return await taskRepository.createTask({
      user_id: userId,
      title,
      deadline,
      status,
      completed
  });
};

const updateTask = async (taskId, userId, taskData) => {
  const existing = await taskRepository.getTaskById(taskId, userId);
  if (!existing) {
      const error = new Error('Task not found')
      error.status = 404
      throw error
  }
  return await taskRepository.updateTask(taskId, userId, taskData);
};

const deleteTask = async (taskId, userId) => {
  const existing = await taskRepository.getTaskById(taskId, userId);
  if (!existing) {
      const error = new Error('Task not found')
      error.status = 404
      throw error
  }
  return await taskRepository.deleteTask(taskId, userId);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};