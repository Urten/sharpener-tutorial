const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');

// Get all students
router.get('/', StudentController.getAllStudents);

// Get student by ID
router.get('/:id', StudentController.getStudentById);

// Add a new student
router.post('/', StudentController.createStudent);

module.exports = router;