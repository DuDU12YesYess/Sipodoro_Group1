const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const StreakRecord = sequelize.define(
  'StreakRecord',
  {
    streak_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    current_streak: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    longest_streak: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    last_completed_cycle: DataTypes.DATE,
}, {
    tableName: "Streak_Record",
    timestamps: false,
  }
);

module.exports= StreakRecord;