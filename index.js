const express = require("express");
const app = express();
const { initializeDatabase } = require('./db/service');
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Middleware
app.use(express.json());

// Database initialization
async function initializeApp() {
  try {
    console.log("Initializing database...");
    await initializeDatabase();
    console.log("Database initialized successfully");

// Mount routes
    app.use('/users', userRoutes);
    app.use('/buses', busRoutes);
    app.use('/bookings', bookingRoutes);

    // Basic route
    app.get("/", (req, res) => {
      res.send('Express MySQL CRUD API');
    });

    // Start server
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Failed to initialize application:", err);
    process.exit(1);
  }
}

// Start the application
initializeApp();