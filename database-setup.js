const sequelize = require('./models/database');
const Student = require('./models/student');
const Course = require('./models/courses');
const Enrollment = require('./models/enrollment');

// Set up many-to-many associations
Student.belongsToMany(Course, { through: Enrollment, foreignKey: 'studentId' });
Course.belongsToMany(Student, { through: Enrollment, foreignKey: 'courseId' });

// Sync database models
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized successfully');
    console.log('All tables are ready');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

module.exports = { sequelize, Student, Course, Enrollment };