const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Seed = sequelize.define(
    "Seed",
    {
      seed_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      growth_required: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "seeds",
      timestamps: true,
    }
  );

  return Seed;
};