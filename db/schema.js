const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('bus_booking', 'guest', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
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

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  busId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Buses',
      key: 'id'
    }
  },
  seatNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Bookings',
  timestamps: false
});

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Bus.hasMany(Booking, { foreignKey: 'busId' });
Booking.belongsTo(Bus, { foreignKey: 'busId' });

module.exports = {
  sequelize,
  User,
  Bus,
  Booking
};