const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const PomodoroCycle = sequelize.define("PomodoroCycle", {
    cycle_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    focus_duration: {
        type: DataTypes.INTEGER,
        defaultValue: 25,
    },
    break_duration: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
    },
    completed_focus_sessions: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    completed_break: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    streak_earned: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    completed_at: DataTypes.DATE,
}, {
    tableName: "Pomodoro_Cycle",
    timestamps: false,
});

module.exports= PomodoroCycle;