const Task = require("../models/Task");

const getAllTasks = async (userId) => {
    return await Task.findAll({
        where: {
            user_id: userId
        }
    });
};

const getTaskById = async (taskId, userId) => {
    return await Task.findOne({
        where: {
            task_id: taskId,
            user_id: userId
        }
    });
};

const createTask = async (taskData) => {
    return await Task.create(taskData)
}

const updateTask = async (taskId, userId, taskData)=>{
return await Task.update(taskData,{
  where:{
    user_id : userId,
    task_id : taskId
  }
})
}

const deleteTask = async (taskId, userId) => {
    return await Task.destroy({
        where: {
            task_id: taskId,
            user_id: userId
        }
    });
};
module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};