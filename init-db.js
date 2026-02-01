// In database-setup.js or init.js
const  sequelize  = require('./models/database');
const { Student, Course, Enrollment } = require('./models/associations');

// Sync database models with alter: true
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized successfully');
    console.log('All tables are ready');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });
