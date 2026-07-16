const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const GardenFlower = sequelize.define(
  "Garden_Flower",
  {
    garden_flower_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    added_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "Garden_Flower",
    timestamps: false,
  }
);

module.exports = GardenFlower;