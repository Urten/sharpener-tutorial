const { Course } = require('../models/associations');

class CourseController {
  static async getAllCourses(req, res) {
    try {
      const courses = await Course.findAll();
      return res.json(courses);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getCourseById(req, res) {
    try {
      const course = await Course.findByPk(req.params.id);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      return res.json(course);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async createCourse(req, res) {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Course name is required' });
      }

      const newCourse = await Course.create({ name, description });
      return res.status(201).json(newCourse);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CourseController;