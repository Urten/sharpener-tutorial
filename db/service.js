const { sequelize } = require('./schema');

async function initializeDatabase() {
  try {
    // Drop existing tables and recreate them
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

module.exports = {
  initializeDatabase
};