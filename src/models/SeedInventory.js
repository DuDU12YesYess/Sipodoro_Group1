const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SeedInventory = sequelize.define(
    "SeedInventory",
    {
      inventory_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
      tableName: "seed_inventories",
      timestamps: true,
    }
  );

  return SeedInventory;
};