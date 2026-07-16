const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const SeedInventory = sequelize.define(
  'SeedInventory',
  {
    inventory_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: "Seed_Inventory",
    timestamps: false,
  }
);

module.exports=SeedInventory;