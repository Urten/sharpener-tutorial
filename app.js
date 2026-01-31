const express = require('express');
// const corsMiddleware = require('./middleware/cors');

const cors = require('cors')
const loggerMiddleware = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const jsonValidator = require('./middleware/jsonValidator');
const userRoutes = require('./routes/user.routes');
const sequelize = require('./config/db');

const app = express();

// Middleware setup
app.use(cors());
app.use(jsonValidator);
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use('/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Sync database and start server
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to sync database:', error);
    process.exit(1);
  });

module.exports = app;