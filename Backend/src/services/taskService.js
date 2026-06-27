const taskRepository = require("../repositories/taskRepository");
const coinService = require("./coinService");

class TaskService {
  async createTask(userId, taskData) {
    try {
      if (!taskData.title || !taskData.title.trim()) {
        throw new Error("Task title is required");
      }

      return await taskRepository.createTask({
        ...taskData,
        userId,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTasks(userId) {
    try {
      return await taskRepository.getTasksByUser(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTaskById(taskId) {
    try {
      const task = await taskRepository.getTaskById(taskId);

      if (!task) {
        throw new Error("Task not found");
      }

      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateTask(taskId, userId, data) {
    try {
      const task = await taskRepository.getTaskById(taskId);

      if (!task) {
        throw new Error("Task not found");
      }

      if (task.userId.toString() !== userId.toString()) {
        throw new Error("Unauthorized");
      }

      return await taskRepository.updateTask(taskId, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async completeTask(taskId, userId) {
    try {
      const task = await taskRepository.getTaskById(taskId);

      if (!task) {
        throw new Error("Task not found");
      }

      if (task.userId.toString() !== userId.toString()) {
        throw new Error("Unauthorized");
      }

      const updated =
        await taskRepository.updateTaskStatus(
          taskId,
          "completed"
        );

      await coinService.addCoins(userId, 5);

      return updated;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteTask(taskId, userId) {
    try {
      const task = await taskRepository.getTaskById(taskId);

      if (!task) {
        throw new Error("Task not found");
      }

      if (task.userId.toString() !== userId.toString()) {
        throw new Error("Unauthorized");
      }

      return await taskRepository.deleteTask(taskId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new TaskService();
