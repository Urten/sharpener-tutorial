const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
      len: [1, 255]
    }
  },
  hallId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Halls',
      key: 'id'
    },
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;