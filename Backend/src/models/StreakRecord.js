const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StreakRecord = sequelize.define(
    "StreakRecord",
    {
      streak_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      current_streak: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      longest_streak: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      last_completed_cycle: {
        type: DataTypes.DATE,
      },
      user_id: {
        type: DataTypes.INTEGER,
        unique: true,
      },
    },
    {
      tableName: "streak_records",
      timestamps: true,
    }
  );

  return StreakRecord;
};
