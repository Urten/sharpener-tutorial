const express = require('express');
const router = express.Router();
const {
  getAllStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController
} = require('../controllers/studentController');

// Middleware to parse JSON
router.use(express.json());

// GET /students - Retrieve all students
router.get('/', getAllStudentsController);

// GET /students/:id - Retrieve a student by ID
router.get('/:id', getStudentByIdController);

// POST /students - Insert a new student
router.post('/', createStudentController);

// PUT /students/:id - Update student details
router.put('/:id', updateStudentController);

// DELETE /students/:id - Delete a student by ID
router.delete('/:id', deleteStudentController);

module.exports = router;