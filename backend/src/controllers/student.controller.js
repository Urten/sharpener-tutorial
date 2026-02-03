const { Student } = require('../models');

exports.createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
};

exports.getStudents = async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
};