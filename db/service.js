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

async function getAllUsers() {
  const query = 'SELECT * FROM Users';

  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(query);
    console.log(`Retrieved ${rows.length} users from database`);
    return rows;
  } catch (err) {
    console.error('Error getting all users:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

async function createBus(busData) {
  const { busNumber, totalSeats, availableSeats } = busData;
  const query = 'INSERT INTO Buses (busNumber, totalSeats, availableSeats) VALUES (?, ?, ?)';

  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.execute(query, [busNumber, totalSeats, availableSeats]);
    console.log(`Bus created: ID ${result.insertId}, Bus Number: ${busNumber}, Total Seats: ${totalSeats}, Available Seats: ${availableSeats}`);
    return { id: result.insertId, busNumber, totalSeats, availableSeats };
  } catch (err) {
    console.error('Error creating bus:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

async function getBusesByAvailableSeats(minSeats) {
  const query = 'SELECT * FROM Buses WHERE availableSeats > ?';

  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(query, [minSeats]);
    console.log(`Retrieved ${rows.length} buses with available seats > ${minSeats}`);
    return rows;
  } catch (err) {
    console.error('Error getting buses by available seats:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

async function insertSampleData() {
  const sampleUsers = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'Bob Johnson', email: 'bob@example.com' }
  ];

  const sampleBuses = [
    { busNumber: 101, totalSeats: 50, availableSeats: 25 },
    { busNumber: 102, totalSeats: 40, availableSeats: 15 },
    { busNumber: 103, totalSeats: 60, availableSeats: 45 },
    { busNumber: 104, totalSeats: 30, availableSeats: 5 },
    { busNumber: 105, totalSeats: 70, availableSeats: 35 }
  ];

  let connection;
  try {
    connection = await getConnection();
    
    // Insert sample users
    console.log('Inserting sample users...');
    for (const user of sampleUsers) {
      const [result] = await connection.execute(
        'INSERT INTO Users (name, email) VALUES (?, ?)',
        [user.name, user.email]
      );
      console.log(`User created: ID ${result.insertId}, Name: ${user.name}, Email: ${user.email}`);
    }

    // Insert sample buses
    console.log('Inserting sample buses...');
    for (const bus of sampleBuses) {
      const [result] = await connection.execute(
        'INSERT INTO Buses (busNumber, totalSeats, availableSeats) VALUES (?, ?, ?)',
        [bus.busNumber, bus.totalSeats, bus.availableSeats]
      );
      console.log(`Bus created: ID ${result.insertId}, Bus Number: ${bus.busNumber}, Total Seats: ${bus.totalSeats}, Available Seats: ${bus.availableSeats}`);
    }

    console.log('Sample data insertion completed successfully');
    return { usersInserted: sampleUsers.length, busesInserted: sampleBuses.length };
  } catch (err) {
    console.error('Error inserting sample data:', err);
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
  getAllUsers,
  createBus,
  getBusesByAvailableSeats,
  insertSampleData,
  initializeDatabase
};
