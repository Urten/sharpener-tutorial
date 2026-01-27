const mysql = require('mysql2/promise');
const { initializeDatabase: initializeSchema } = require('./schema');

// Database configuration
const dbConfig = {
  host: "localhost",
  user: "guest",
  password: "123456",
  database: "testdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

async function getConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection acquired');
    return connection;
  } catch (err) {
    console.error('Error getting database connection:', err);
    throw err;
  }
}

async function initializeDatabase() {
  let connection;
  try {
    connection = await getConnection();
    await initializeSchema(connection);
  } catch (err) {
    console.error('Database initialization failed:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

async function createUser(userData) {
  const { name, email } = userData;
  const query = 'INSERT INTO Users (name, email) VALUES (?, ?)';

  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.execute(query, [name, email]);
    console.log(`User created: ID ${result.insertId}, Name: ${name}, Email: ${email}`);
    return { id: result.insertId, name, email };
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

async function updateUser(id, userData) {
  const { name, email } = userData;
  const query = 'UPDATE Users SET name = ?, email = ? WHERE id = ?';

  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.execute(query, [name, email, id]);

    if (result.affectedRows === 0) {
      console.log(`No user found with ID ${id} to update`);
      return null;
    }

    console.log(`User updated: ID ${id}, Name: ${name}, Email: ${email}`);
    return { id, name, email };
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

async function deleteUser(id) {
  const query = 'DELETE FROM Users WHERE id = ?';

  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.execute(query, [id]);

    if (result.affectedRows === 0) {
      console.log(`No user found with ID ${id} to delete`);
      return false;
    }

    console.log(`User deleted: ID ${id}`);
    return true;
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

async function getUserById(id) {
  const query = 'SELECT * FROM Users WHERE id = ?';

  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(query, [id]);
    return rows[0] || null;
  } catch (err) {
    console.error('Error getting user:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  initializeDatabase
};