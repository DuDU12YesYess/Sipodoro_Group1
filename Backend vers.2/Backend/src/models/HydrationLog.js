const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const HydrationLog = sequelize.define(
  "HydrationLog", {
    hydration_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    check_in_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "Hydration_Log",
    timestamps: false,
  }
);

module.exports= HydrationLog;