const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TaskCategory = sequelize.define(
    "TaskCategory",
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "task_categories",
      timestamps: true,
    }
  );

  return TaskCategory;
};
