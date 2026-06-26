const Task = require("../models/Task");

class TaskRepository {
  /**
   * Create task
   */
  async createTask(data) {
    return await Task.create(data);
  }

  /**
   * Get task by ID
   */
  async getTaskById(id) {
    return await Task.findById(id);
  }

  /**
   * Get all tasks for user
   */
  async getTasksByUser(userId) {
    return await Task.find({ userId })
      .sort({ createdAt: -1 });
  }

  /**
   * Get completed tasks
   */
  async getCompletedTasks(userId) {
    return await Task.find({
      userId,
      status: "completed",
    });
  }

  /**
   * Update task
   */
  async updateTask(id, data) {
    return await Task.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  /**
   * Update task status
   */
  async updateTaskStatus(id, status) {
    return await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  }

  /**
   * Delete task
   */
  async deleteTask(id) {
    return await Task.findByIdAndDelete(id);
  }
}

module.exports = new TaskRepository();