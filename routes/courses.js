const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/courseController');

// Get all courses
router.get('/', CourseController.getAllCourses);

// Get course by ID
router.get('/:id', CourseController.getCourseById);

// Add a new course
router.post('/', CourseController.createCourse);

module.exports = router;