const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const ShopTransaction = sequelize.define(
  'Shop_Transaction',
  {
    shop_transaction_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    coin_spent: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "Shop_Transaction",
    timestamps: false,
  }
);

module.exports= ShopTransaction;