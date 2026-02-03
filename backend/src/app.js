const express = require('express');
const app = express();
const cors = require("cors")

app.use(express.json());
/**
 * CORS configuration
 * Allows browser-based SPA (Axios) to work correctly
 */
app.use(cors({
  origin: '*', // for development; restrict in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

// IMPORTANT: handle preflight requests
app.options('*', cors());
app.use('/api/students', require('./routes/student.routes'));
app.use('/api/attendance', require('./routes/attendance.routes'));
app.use('/api/report', require('./routes/report.routes'));

module.exports = app;