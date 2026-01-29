const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('testdb', 'guest', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    connectionName: 'testConnection'
  }
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'Users',
  timestamps: false
});

const Bus = sequelize.define('Bus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  busNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Buses',
  timestamps: false
});

module.exports = {
  sequelize,
  User,
  Bus
};