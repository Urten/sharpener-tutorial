const { Student, Course } = require('../models/associations');

class EnrollmentController {
  static async enrollStudent(req, res) {
    try {
      const { studentId, courseId } = req.body;

      if (!studentId || !courseId) {
        return res.status(400).json({ error: 'Student ID and Course ID are required' });
      }

      const student = await Student.findByPk(studentId);
      const course = await Course.findByPk(courseId);

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      await student.addCourse(course);
      return res.status(201).json({ message: 'Student enrolled successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getStudentEnrollments(req, res) {
    try {
      const student = await Student.findByPk(req.params.studentId, {
        include: [{
          model: Course,
          as: 'Courses'
        }]
      });

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      return res.json(student.Courses);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getCourseEnrollments(req, res) {
    try {
      const course = await Course.findByPk(req.params.courseId, {
        include: [{
          model: Student,
          as: 'Students'
        }]
      });

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      return res.json(course.Students);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EnrollmentController;