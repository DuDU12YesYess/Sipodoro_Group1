import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const User = sequelize.define(             // .define() maps a JS object to a table
  'User',                                    // model name (Sequelize uses this as the table name)
  {
    user_id:{
        type: DataTypes.INTEGER,                  // STRING
        primaryKey: true,
        autoIncrement: true,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
    },
    total_streak:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    total_flower:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    create_at:{
        type: DataTypes.DATE,
        defaultValue:DataType.NOW,
    },
    admin_id:{
        type: DataTypes.INTEGER,                  // STRING
        allowNull: true,
    },
    }
);


export default User;