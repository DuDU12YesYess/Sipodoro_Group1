const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CoinWallet = sequelize.define(
    "CoinWallet",
    {
      coin_wallet_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      total_coins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      user_id: {
        type: DataTypes.INTEGER,
        unique: true,
      },
    },
    {
      tableName: "coin_wallets",
      timestamps: true,
    }
  );

  return CoinWallet;
};
