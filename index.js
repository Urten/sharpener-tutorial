const express = require("express");
const app = express()
const mysql = require("mysql2/promise"); // Using promise-based API
const { initializeDatabase } = require('./db/schema');

// Database configuration
const dbConfig = {
  host: "localhost",
  user: "guest",
  password: "123456",
  database: "testdb"
};

async function main() {
  let connection;
  try {
    // Create connection using async/await
    connection = await mysql.createConnection(dbConfig);
    console.log("Connection has been created");

    // Initialize database schema
    await initializeDatabase(connection);

    // Start server
    app.get("/", (req, res) => {
      res.send('Hello World')
    });

    app.listen(3000, (err) => {
      if (err) {
        console.error("Server failed to start:", err);
        return;
      }
      console.log("Server is running on port 3000");
    });

  } catch (err) {
    console.error("Application error:", err);
    if (connection) {
      try {
        await connection.end();
      } catch (endErr) {
        console.error("Error closing connection:", endErr);
      }
    }
    process.exit(1);
  }
}

// Start the application
main();