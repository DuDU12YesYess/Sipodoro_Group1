const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Garden = sequelize.define(
    "Garden",
    {
      garden_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      user_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
    },
    {
      tableName: "gardens",
      timestamps: false,
    }
  );

  return Garden;
};