const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Task = sequelize.define("Task", {
    task_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Urgent", "Critical", "Low Critical"),
        defaultValue: "Urgent",
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "Task",
    timestamps: false,
});

module.exports= Task;


