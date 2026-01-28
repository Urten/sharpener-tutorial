const { pool } = require('../config/database');

// Get all students
async function getAllStudents() {
  const query = 'SELECT * FROM students ORDER BY created_at DESC';
  const [rows] = await pool.execute(query);
  return rows;
}

// Get student by ID
async function getStudentById(id) {
  const query = 'SELECT * FROM students WHERE id = ?';
  const [rows] = await pool.execute(query, [id]);
  return rows[0] || null;
}

// Create new student
async function createStudent(studentData) {
  const { name, email, age } = studentData;
  const query = 'INSERT INTO students (name, email, age) VALUES (?, ?, ?)';
  const [result] = await pool.execute(query, [name, email, age]);
  
  // Return the created student with ID
  return {
    id: result.insertId,
    name,
    email,
    age,
    created_at: new Date(),
    updated_at: new Date()
  };
}

// Update student
async function updateStudent(id, studentData) {
  const { name, email, age } = studentData;
  const query = 'UPDATE students SET name = ?, email = ?, age = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  const [result] = await pool.execute(query, [name, email, age, id]);
  
  if (result.affectedRows === 0) {
    return null; // No student found with this ID
  }
  
  // Return updated student data
  return {
    id,
    name,
    email,
    age,
    updated_at: new Date()
  };
}

// Delete student
async function deleteStudent(id) {
  const query = 'DELETE FROM students WHERE id = ?';
  const [result] = await pool.execute(query, [id]);
  
  return result.affectedRows > 0; // Return true if a student was deleted
}

// Check if email already exists (for validation)
async function checkEmailExists(email, excludeId = null) {
  let query = 'SELECT COUNT(*) as count FROM students WHERE email = ?';
  let params = [email];
  
  if (excludeId) {
    query += ' AND id != ?';
    params.push(excludeId);
  }
  
  const [rows] = await pool.execute(query, params);
  return rows[0].count > 0;
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  checkEmailExists
};