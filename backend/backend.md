# Attendance Reporting Backend (Sequelize + Express)

This document describes how to build the **complete backend** for the Attendance Reporting App using **Express + Sequelize**, **without dynamic model loaders**. All imports and associations are explicit to keep things simple and readable.

---

## 1. Tech Stack

* Node.js
* Express.js
* Sequelize ORM
* PostgreSQL / MySQL / SQLite (any SQL DB supported by Sequelize)

---

## 2. Project Structure

```
attendance-backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Student.js
│   │   ├── AttendanceSession.js
│   │   ├── AttendanceRecord.js
│   │   └── index.js
│   ├── controllers/
│   │   ├── student.controller.js
│   │   ├── attendance.controller.js
│   │   └── report.controller.js
│   ├── routes/
│   │   ├── student.routes.js
│   │   ├── attendance.routes.js
│   │   └── report.routes.js
│   ├── app.js
│   └── server.js
├── package.json
└── instructions.md
```

---

## 3. Database Configuration

### `src/config/database.js`

```js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('attendance_db', 'guest', '123456', {
  host: 'localhost',
  dialect: 'mysql', // or mysql / sqlite
  logging: false
});

module.exports = sequelize;
```

---

## 4. Sequelize Models (Explicit, No Loader)

### 4.1 Student Model

```js
// src/models/Student.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Student', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    roll_no: { type: DataTypes.STRING, allowNull: false, unique: true }
  }, {
    tableName: 'students',
    timestamps: true
  });
};
```

---

### 4.2 AttendanceSession Model

```js
// src/models/AttendanceSession.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('AttendanceSession', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    attendance_date: { type: DataTypes.DATEONLY, allowNull: false, unique: true },
    is_finalized: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'attendance_sessions',
    timestamps: true
  });
};
```

---

### 4.3 AttendanceRecord Model

```js
// src/models/AttendanceRecord.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('AttendanceRecord', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    attendance_session_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('present', 'absent'), allowNull: false }
  }, {
    tableName: 'attendance_records',
    timestamps: true,
    indexes: [{ unique: true, fields: ['student_id', 'attendance_session_id'] }]
  });
};
```

---

## 5. Model Initialization & Associations

### `src/models/index.js`

```js
const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Student = require('./Student')(sequelize, DataTypes);
const AttendanceSession = require('./AttendanceSession')(sequelize, DataTypes);
const AttendanceRecord = require('./AttendanceRecord')(sequelize, DataTypes);

Student.hasMany(AttendanceRecord, { foreignKey: 'student_id' });
AttendanceRecord.belongsTo(Student, { foreignKey: 'student_id' });

AttendanceSession.hasMany(AttendanceRecord, { foreignKey: 'attendance_session_id' });
AttendanceRecord.belongsTo(AttendanceSession, { foreignKey: 'attendance_session_id' });

module.exports = {
  sequelize,
  Student,
  AttendanceSession,
  AttendanceRecord
};
```

---

## 6. Controllers

### 6.1 Student Controller

```js
// src/controllers/student.controller.js
const { Student } = require('../models');

exports.createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
};

exports.getStudents = async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
};
```

---

### 6.2 Attendance Controller

```js
// src/controllers/attendance.controller.js
const { AttendanceSession, AttendanceRecord } = require('../models');

exports.getOrCreateSession = async (req, res) => {
  const { date } = req.query;
  const [session] = await AttendanceSession.findOrCreate({
    where: { attendance_date: date }
  });
  res.json(session);
};

exports.markAttendance = async (req, res) => {
  const { session_id, records } = req.body;

  const session = await AttendanceSession.findByPk(session_id);
  if (session.is_finalized) {
    return res.status(400).json({ message: 'Attendance already finalized' });
  }

  for (const record of records) {
    await AttendanceRecord.upsert({
      attendance_session_id: session_id,
      student_id: record.student_id,
      status: record.status
    });
  }

  res.json({ message: 'Attendance saved' });
};

exports.finalizeAttendance = async (req, res) => {
  const { session_id } = req.body;
  await AttendanceSession.update(
    { is_finalized: true },
    { where: { id: session_id } }
  );
  res.json({ message: 'Attendance finalized' });
};
```

---

### 6.3 Report Controller

```js
// src/controllers/report.controller.js
const { sequelize } = require('../models');

exports.getAttendanceReport = async (req, res) => {
  const [results] = await sequelize.query(`
    SELECT
      s.id,
      s.name,
      COUNT(ar.id) AS total_days,
      SUM(CASE WHEN ar.status = 'present' THEN 1 ELSE 0 END) AS present_days,
      ROUND(
        (SUM(CASE WHEN ar.status = 'present' THEN 1 ELSE 0 END) * 100.0) /
        COUNT(ar.id),
        2
      ) AS present_percentage
    FROM students s
    LEFT JOIN attendance_records ar ON ar.student_id = s.id
    LEFT JOIN attendance_sessions ses ON ses.id = ar.attendance_session_id
    WHERE ses.is_finalized = true
    GROUP BY s.id
  `);

  res.json(results);
};
```

---

## 7. Routes

```js
// src/routes/student.routes.js
const router = require('express').Router();
const ctrl = require('../controllers/student.controller');

router.post('/', ctrl.createStudent);
router.get('/', ctrl.getStudents);

module.exports = router;
```

```js
// src/routes/attendance.routes.js
const router = require('express').Router();
const ctrl = require('../controllers/attendance.controller');

router.get('/session', ctrl.getOrCreateSession);
router.post('/mark', ctrl.markAttendance);
router.post('/finalize', ctrl.finalizeAttendance);

module.exports = router;
```

```js
// src/routes/report.routes.js
const router = require('express').Router();
const ctrl = require('../controllers/report.controller');

router.get('/', ctrl.getAttendanceReport);

module.exports = router;
```

---

## 8. App & Server Bootstrap

```js
// src/app.js
const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/students', require('./routes/student.routes'));
app.use('/api/attendance', require('./routes/attendance.routes'));
app.use('/api/report', require('./routes/report.routes'));

module.exports = app;
```

```js
// src/server.js
const app = require('./app');
const { sequelize } = require('./models');

(async () => {
  await sequelize.sync();
  app.listen(3000, () => console.log('Server running on port 3000'));
})();
```

---

## 9. Key Guarantees

* No dynamic loaders
* Explicit associations
* No duplicate attendance
* Finalized sessions are immutable
* Reports are computed, not stored

---

## 10. Next Steps

* Add authentication (admin / teacher)
* Add class / batch support
* Add edit-with-unfinalize flow
* Add pagination to reports
