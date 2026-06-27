const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ShopTransaction = sequelize.define(
    "ShopTransaction",
    {
      shop_transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      coin_spent: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
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
      tableName: "shop_transactions",
      timestamps: false,
    }
  );

  return ShopTransaction;
};
