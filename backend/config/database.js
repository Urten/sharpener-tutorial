const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('attendance_db', 'guest', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
