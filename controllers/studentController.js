const { Student } = require('../models/associations');

class StudentController {
  static async getAllStudents(req, res) {
    try {
      const students = await Student.findAll();
      return res.json(students);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getStudentById(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      return res.json(student);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async createStudent(req, res) {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }

      const newStudent = await Student.create({ name, email });
      return res.status(201).json(newStudent);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = StudentController;