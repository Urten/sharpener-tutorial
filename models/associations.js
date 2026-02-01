const { sequelize } = require('./database');
const Student = require('./student');
const Course = require('./courses');
const Enrollment = require('./enrollment');

// Set up many-to-many associations
Student.belongsToMany(Course, { through: Enrollment, foreignKey: 'studentId' });
Course.belongsToMany(Student, { through: Enrollment, foreignKey: 'courseId' });

module.exports = { sequelize, Student, Course, Enrollment };
