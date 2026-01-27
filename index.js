const express = require("express");
const app = express();
const { initializeDatabase } = require('./db/service');
const userRoutes = require('./routes/userRoutes');

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

    // Basic route
    app.get("/", (req, res) => {
      res.send('Express MySQL CRUD API');
    });

    // Start server
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);

      // Run the Virat Kohli test case
      runTestCase();
    });

  } catch (err) {
    console.error("Failed to initialize application:", err);
    process.exit(1);
  }
}

// Virat Kohli Test Case
async function runTestCase() {
  console.log("\n=== Starting Virat Kohli Test Case ===");

  try {
    // Step 1: Create Virat Kohli
    console.log("\n1. Creating Virat Kohli...");
    const createResponse = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Virat Kohli',
        email: 'virat.kohli@example.com'
      })
    });

    const createData = await createResponse.json();
    console.log('Create Response:', createData);

    if (!createData.success || !createData.data) {
      throw new Error('Failed to create user');
    }

    const userId = createData.data.id;

    // Step 2: Update to King Kohli
    console.log(`\n2. Updating user ${userId} to King Kohli...`);
    const updateResponse = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'King Kohli',
        email: 'king.kohli@example.com'
      })
    });

    const updateData = await updateResponse.json();
    console.log('Update Response:', updateData);

    if (!updateData.success) {
      throw new Error('Failed to update user');
    }

    // Step 3: Delete the user
    console.log(`\n3. Deleting user ${userId}...`);
    const deleteResponse = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE'
    });

    const deleteData = await deleteResponse.json();
    console.log('Delete Response:', deleteData);

    if (!deleteData.success) {
      throw new Error('Failed to delete user');
    }

    console.log("\nVirat Kohli Test Case Completed Successfully");

  } catch (err) {
    console.error("\nVirat Kohli Test Case Failed");
    console.error("Error:", err.message);
  }
}

// Start the application
initializeApp();