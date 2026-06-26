const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Flower = sequelize.define(
    "Flower",
    {
      flower_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      growth_stage: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      date_planted: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      date_bloomed: DataTypes.DATE,
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      seed_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "flowers",
      timestamps: true,
    }
  );

  return Flower;
};