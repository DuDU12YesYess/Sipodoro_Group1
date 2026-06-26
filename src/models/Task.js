const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Task = sequelize.define(
    "Task",
    {
      task_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "in_progress",
          "completed"
        ),
        defaultValue: "pending",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "tasks",
      timestamps: false,
    }
  );

  return Task;
};