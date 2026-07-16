const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const TaskCategory = sequelize.define("TaskCategory", {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: "Task_Category",
    timestamps: false,
});

module.exports= TaskCategory;