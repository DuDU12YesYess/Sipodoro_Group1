const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Seed = sequelize.define("Seed", {
    seed_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    seed_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    growth_required: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
    },
    image_url: DataTypes.STRING,
}, {
    tableName: "Seed",
    timestamps: false,
});

module.exports= Seed;