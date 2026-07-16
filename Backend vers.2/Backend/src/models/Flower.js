const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Flower = sequelize.define(
  'Flower',
  {
    flower_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    seed_id: {
        type: DataTypes.INTEGER,
    },
    growth_stage: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    status: {
        type: DataTypes.ENUM("Sprout", "Bud", "Bloomed"),
        defaultValue: "Sprout",
    },
    date_planted: DataTypes.DATE,
    date_bloomed: DataTypes.DATE,
}, {
    tableName: "Flower",
    timestamps: false,
  }
);

module.exports= Flower;