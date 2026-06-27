const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const HydrationLog = sequelize.define(
    "HydrationLog",
    {
      hydration_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      check_in_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "hydration_logs",
      timestamps: true,
    }
  );

  return HydrationLog;
};
