const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Garden = sequelize.define(
  'Garden',
  {
    garden_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "Garden",
    timestamps: false,
  }
);

module.exports= Garden;