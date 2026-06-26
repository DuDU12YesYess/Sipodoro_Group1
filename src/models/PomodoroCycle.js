const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PomodoroCycle = sequelize.define(
    "PomodoroCycle",
    {
      cycle_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      completed_focus_sessions: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      completed_break: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      streak_earned: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      completed_at: DataTypes.DATE,
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "pomodoro_cycles",
      timestamps: true,
    }
  );

  return PomodoroCycle;
};