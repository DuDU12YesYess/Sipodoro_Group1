const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CoinTransaction = sequelize.define(
    "CoinTransaction",
    {
      transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      earned_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "coin_transactions",
      timestamps: true,
    }
  );

  return CoinTransaction;
}; 
