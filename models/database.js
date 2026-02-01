const { Sequelize } = require('sequelize');

const DB_NAME = "test_db"
const DB_USER = "guest"
const DB_PASS = "123456"
const DB_HOST = "localhost"

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql'
});

// Test the connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connection established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

module.exports = sequelize;
