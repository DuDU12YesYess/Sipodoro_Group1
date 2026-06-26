const { Task } = require("../models");

/* GET ALL TASKS */
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET TASK BY ID */
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* CREATE TASK */
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE TASK */
exports.updateTask = async (req, res) => {
  try {
    await Task.update(req.body, {
      where: { task_id: req.params.id },
    });

    res.json({ message: "Task updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DELETE TASK */
exports.deleteTask = async (req, res) => {
  try {
    await Task.destroy({
      where: { task_id: req.params.id },
    });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};