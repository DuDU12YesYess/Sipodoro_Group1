const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'user_id'
    },
    username: {
        type: DataTypes.STRING,
        field: 'username'
    },
    email: {
        type: DataTypes.STRING,
        field: 'email'
    },
    password: {
        type: DataTypes.STRING,
        field: 'password_hash'
    },
    role: {
        type: DataTypes.STRING,
        field: 'role'
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        field: 'created_at'
    }
    
}, {
    tableName: 'Users',
    timestamps: false
});

module.exports = User;