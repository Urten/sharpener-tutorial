const sequelize = require('./db');
const User = require('./user.model');
const Hall = require('./hall.model');

User.belongsTo(Hall, { foreignKey: 'hallId', as: 'hall' });
Hall.hasMany(User, { foreignKey: 'hallId', as: 'users' });

module.exports = {
  User,
  Hall,
  sequelize
};