const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const CoinTransaction = sequelize.define(
  'CoinTransaction',
  {
    transaction_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "Coin_Transaction",
    timestamps: false,
  }
);

module.exports = CoinTransaction;