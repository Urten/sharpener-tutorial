const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/students');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import database initialization
const { initializeDatabase, testConnection } = require('./config/database');

// Test database connection and initialize
async function startServer() {
  try {
    // Test database connection
    await testConnection();
    
    // Initialize database (create table if it doesn't exist)
    await initializeDatabase();
    
    // Mount routes
    app.use('/students', studentRoutes);
    
    // Root endpoint
    app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Student Management API is running',
        endpoints: {
          'GET /students': 'Get all students',
          'GET /students/:id': 'Get student by ID',
          'POST /students': 'Create new student',
          'PUT /students/:id': 'Update student',
          'DELETE /students/:id': 'Delete student'
        }
      });
    });
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API Documentation: http://localhost:${PORT}/`);
      console.log(`Students API: http://localhost:${PORT}/students`);
      
      // Run the specific student operations after server starts
      setTimeout(() => {
        runStudentOperations();
      }, 1000);
    });
    
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

// Function to perform the specific student operations
// async function runStudentOperations() {
//   console.log('\n=== Starting Student Operations ===');
  
//   try {
//     // Import fetch for making HTTP requests
//     const fetch = (await import('node-fetch')).default;
    
//     // 1. Insertion: Add MS Dhoni
//     console.log('\n1. Adding MS Dhoni...');
//     const msDhoniResponse = await fetch(`http://localhost:${PORT}/students`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: 'MS Dhoni',
//         email: 'dhoni@example.com',
//         age: 42
//       })
//     });
    
//     const msDhoniData = await msDhoniResponse.json();
//     console.log('MS Dhoni Response:', msDhoniData);
    
//     if (!msDhoniData.success || !msDhoniData.data) {
//       throw new Error('Failed to add MS Dhoni');
//     }
    
//     const msDhoniId = msDhoniData.data.id;
    
//     // 2. Insertion: Add Virat Kohli
//     console.log('\n2. Adding Virat Kohli...');
//     const viratResponse = await fetch(`http://localhost:${PORT}/students`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: 'Virat Kohli',
//         email: 'virat.kohli@example.com',
//         age: 35
//       })
//     });
    
//     const viratData = await viratResponse.json();
//     console.log('Virat Kohli Response:', viratData);
    
//     if (!viratData.success || !viratData.data) {
//       throw new Error('Failed to add Virat Kohli');
//     }
    
//     const viratId = viratData.data.id;
    
//     // 3. Updating: Modify MS Dhoni
//     console.log('\n3. Updating MS Dhoni to Captain Cool...');
//     const updateResponse = await fetch(`http://localhost:${PORT}/students/${msDhoniId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: 'Captain Cool',
//         email: 'captaincool@example.com',
//         age: 42
//       })
//     });
    
//     const updateData = await updateResponse.json();
//     console.log('Update Response:', updateData);
    
//     if (!updateData.success) {
//       throw new Error('Failed to update MS Dhoni');
//     }
    
//     // 4. Deletion: Delete Virat Kohli
//     console.log('\n4. Deleting Virat Kohli...');
//     const deleteResponse = await fetch(`http://localhost:${PORT}/students/${viratId}`, {
//       method: 'DELETE'
//     });
    
//     const deleteData = await deleteResponse.json();
//     console.log('Delete Response:', deleteData);
    
//     if (!deleteData.success) {
//       throw new Error('Failed to delete Virat Kohli');
//     }
    
//     // 5. Verify deletion by fetching all students
//     console.log('\n5. Verifying deletion by fetching all students...');
//     const allStudentsResponse = await fetch(`http://localhost:${PORT}/students`);
//     const allStudentsData = await allStudentsResponse.json();
//     console.log('All Students Response:', allStudentsData);
    
//     console.log('\n=== Student Operations Completed Successfully ===');
//     console.log(`Final student count: ${allStudentsData.data.length}`);
    
//   } catch (err) {
//     console.error('\n=== Student Operations Failed ===');
//     console.error('Error:', err.message);
//   }
// }

// Start the server
startServer();