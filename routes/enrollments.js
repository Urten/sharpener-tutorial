const express = require('express');
const router = express.Router();
const EnrollmentController = require('../controllers/enrollmentController');

// Enroll a student in a course
router.post('/', EnrollmentController.enrollStudent);

// Get all courses a student is enrolled in
router.get('/students/:studentId', EnrollmentController.getStudentEnrollments);

// Get all students enrolled in a course
router.get('/courses/:courseId', EnrollmentController.getCourseEnrollments);

module.exports = router;