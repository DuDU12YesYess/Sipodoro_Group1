import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Admin = sequelize.define(             // .define() maps a JS object to a table
  'Admin',                                    // model name (Sequelize uses this as the table name)
  {
    admin_id: {
        type: DataTypes.INTEGER,                  // STRING
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
    },
    }
);


export default Admin;