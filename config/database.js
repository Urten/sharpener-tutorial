// Boilerplate SQL database connection code

const mysql = require('mysql2/promise');
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

// Getter to get the latest pool version
async function getPool() {
  return pool;
}

// Initialize the database connection
async function initializeDatabase() {
  try {
    pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    connection.release();
  } catch (err) {
    console.error('Failed to initialize database connection:', err);
    throw err;
  }
}

// Test the database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('Database connection tested successfully');
  } catch (err) {
    console.error('Failed to test database connection:', err);
    throw err;
  }
}

// Export functions
module.exports = {
  getPool,
  initializeDatabase,
  testConnection
};

