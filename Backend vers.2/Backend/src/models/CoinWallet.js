const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const CoinWallet = sequelize.define(
  'Coin_Wallet',
  {
    wallet_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    total_coins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: "Coin_Wallet",
    timestamps: false,
  }
);

module.exports = CoinWallet;