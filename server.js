const express = require('express');
const app = express();

app.use(express.json());

const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');

// logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request made to ${req.url}`);
  next();
});

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Student & Course Portal API!');
});

// Routes
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
