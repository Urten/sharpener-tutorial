const TABLE_DEFINITIONS = {
  Users: `
    CREATE TABLE IF NOT EXISTS Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20)
    )
  `,
  Buses: `
    CREATE TABLE IF NOT EXISTS Buses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      busNumber INT,
      totalSeats INT,
      availableSeats INT
    )
  `,
  Bookings: `
    CREATE TABLE IF NOT EXISTS Bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      seatNumber INT
    )
  `,
  Payments: `
    CREATE TABLE IF NOT EXISTS Payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      amountPaid INT,
      paymentStatus VARCHAR(255)
    )
  `
};

async function initializeDatabase(connection) {
  try {
    // Create tables individually for better error handling
    for (const [tableName, createQuery] of Object.entries(TABLE_DEFINITIONS)) {
      try {
        await connection.execute(createQuery);
        console.log(`Table ${tableName} created or already exists`);
      } catch (err) {
        console.error(`Error creating table ${tableName}:`, err.message);
        // Continue with other tables even if one fails
      }
    }
    console.log("Database initialization complete");
  } catch (err) {
    console.error("Database initialization failed:", err);
    throw err;
  }
}

module.exports = {
  initializeDatabase
};