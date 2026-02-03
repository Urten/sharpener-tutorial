# Attendance Reporting Backend

This is the backend implementation for the Attendance Reporting App using Express.js and Sequelize ORM.

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL (can be configured for PostgreSQL/SQLite)

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── models/
│   │   ├── Student.js           # Student model
│   │   ├── AttendanceSession.js # Attendance session model
│   │   ├── AttendanceRecord.js  # Attendance record model
│   │   └── index.js             # Model associations and exports
│   ├── controllers/
│   │   ├── student.controller.js    # Student CRUD operations
│   │   ├── attendance.controller.js # Attendance operations
│   │   └── report.controller.js     # Report generation
│   ├── routes/
│   │   ├── student.routes.js    # Student API routes
│   │   ├── attendance.routes.js # Attendance API routes
│   │   └── report.routes.js     # Report API routes
│   ├── app.js                   # Express app configuration
│   └── server.js                # Server bootstrap
├── package.json
└── README.md
```

## API Endpoints

### Students
- `POST /api/students` - Create a new student
- `GET /api/students` - Get all students

### Attendance
- `GET /api/attendance/session?date=YYYY-MM-DD` - Get or create attendance session
- `POST /api/attendance/mark` - Mark attendance for students
- `POST /api/attendance/finalize` - Finalize attendance session

### Reports
- `GET /api/report` - Get attendance report

## Database Models

### Student
- id (Primary Key)
- name
- roll_no (Unique)

### AttendanceSession
- id (Primary Key)
- attendance_date (Unique)
- is_finalized

### AttendanceRecord
- id (Primary Key)
- student_id (Foreign Key)
- attendance_session_id (Foreign Key)
- status (ENUM: 'present', 'absent')

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure database in `src/config/database.js`

3. Start the server:
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

## Key Features

- No dynamic model loaders - all imports are explicit
- Explicit associations between models
- No duplicate attendance records (unique constraint)
- Finalized sessions are immutable
- Reports are computed dynamically, not stored

## Next Steps

- Add authentication (admin/teacher)
- Add class/batch support
- Add edit-with-unfinalize flow
- Add pagination to reports