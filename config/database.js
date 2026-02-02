const { Sequelize } = require('sequelize');

// Database configuration
const sequelize = new Sequelize('expense_db', 'guest', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Set to console.log to see SQL queries
  define: {
    timestamps: true,
    underscored: false
  }
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to database:', error);
  }
}

// Sync models with database
async function syncDatabase() {
  try {
    await sequelize.sync({ force: false }); // force: false means don't drop tables if they exist
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Error syncing database:', error);
  }
}

module.exports = {
  sequelize,
  testConnection,
  syncDatabase
};