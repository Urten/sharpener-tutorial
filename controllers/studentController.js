const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  checkEmailExists
} = require('../models/studentModel');

// Get all students
async function getAllStudentsController(req, res) {
  try {
    const students = await getAllStudents();
    res.status(200).json({
      success: true,
      message: `Retrieved ${students.length} students`,
      data: students
    });
  } catch (err) {
    console.error('Error getting all students:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
}

// Get student by ID
async function getStudentByIdController(req, res) {
  try {
    const { id } = req.params;
    
    // Validate ID is a number
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }
    
    const student = await getStudentById(parseInt(id));
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found`
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: student
    });
  } catch (err) {
    console.error('Error getting student by ID:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
}

// Create new student
async function createStudentController(req, res) {
  try {
    const { name, email, age } = req.body;
    
    // Validate required fields
    if (!name || !email || !age) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and age are required'
      });
    }
    
    // Validate age is a number
    if (isNaN(age) || age < 0) {
      return res.status(400).json({
        success: false,
        message: 'Age must be a valid positive number'
      });
    }
    
    // Check if email already exists
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    // Create student
    const newStudent = await createStudent({ name, email, age });
    
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: newStudent
    });
  } catch (err) {
    console.error('Error creating student:', err);
    
    // Handle MySQL duplicate key error
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
}

// Update student
async function updateStudentController(req, res) {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    
    // Validate ID is a number
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }
    
    // Validate required fields
    if (!name || !email || !age) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and age are required'
      });
    }
    
    // Validate age is a number
    if (isNaN(age) || age < 0) {
      return res.status(400).json({
        success: false,
        message: 'Age must be a valid positive number'
      });
    }
    
    // Check if email already exists (excluding current student)
    const emailExists = await checkEmailExists(email, parseInt(id));
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    // Update student
    const updatedStudent = await updateStudent(parseInt(id), { name, email, age });
    
    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found`
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent
    });
  } catch (err) {
    console.error('Error updating student:', err);
    
    // Handle MySQL duplicate key error
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
}

// Delete student
async function deleteStudentController(req, res) {
  try {
    const { id } = req.params;
    
    // Validate ID is a number
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }
    
    const deleted = await deleteStudent(parseInt(id));
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found`
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
}

module.exports = {
  getAllStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController
};