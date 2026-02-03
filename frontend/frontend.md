# Attendance App – Frontend (Pure JavaScript SPA)

This document describes the **frontend implementation** of the Attendance Reporting App using **pure JavaScript**, **no frameworks**, and a **single-page application (SPA)** architecture.

The frontend communicates directly with the existing backend API.

---

## 1. Goals

* Add and manage students from the frontend UI

* No React / Vue / Angular

* No build tools

* Single HTML page

* Vanilla JavaScript only

* Clear separation of views

* Direct mapping to backend APIs

---

## 2. Folder Structure

```
frontend/
├── index.html
├── style.css
└── app.js
```

---

## 3. index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Attendance App</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <nav>
    <button onclick="showCalendar()">Calendar</button>
    <button onclick="showReport()">Report</button>
    <button onclick="showAddStudent()">Add Student</button>
  </nav>

  <main>
    <div id="calendar-view"></div>
    <div id="attendance-view" hidden></div>
    <div id="report-view" hidden></div>
  </main>

  <script src="app.js"></script>
</body>
</html>
```

---

## 4. style.css (Minimal Styling)

```css
body {
  font-family: Arial, sans-serif;
  padding: 16px;
}

nav {
  margin-bottom: 16px;
}

button {
  margin-right: 8px;
}

.student-row {
  display: flex;
  gap: 12px;
  margin-bottom: 6px;
}

table {
  border-collapse: collapse;
}

td, th {
  border: 1px solid #ccc;
  padding: 6px 10px;
}
```

---

## 5. app.js

This file contains **all SPA logic**, including attendance, reports, and student management.

Axios is used for all HTTP communication.

> Axios is used for all HTTP communication.

### 5.1 Constants & Utilities

```js
const API = 'http://localhost:3000/api';

const calendarView = document.getElementById('calendar-view');
const attendanceView = document.getElementById('attendance-view');
const reportView = document.getElementById('report-view');

function hideAll() {
  calendarView.hidden = true;
  attendanceView.hidden = true;
  reportView.hidden = true;
}

// Axios setup
const axiosInstance = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' }
});

async function apiGet(path) {
  const res = await axiosInstance.get(path);
  return res.data;
}(path) {
  const res = await fetch(API + path);
  return res.json();
}

async function apiPost(path, body) {
  const res = await axiosInstance.post(path, body);
  return res.data;
}(path, body) {
  const res = await fetch(API + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}
```

---

### 5.2 Calendar View

Uses native date input for simplicity.

```js
function showCalendar() {
  hideAll();
  calendarView.hidden = false;

  calendarView.innerHTML = `
    <h2>Select Date</h2>
    <input type="date" id="datePicker" />
    <button onclick="openAttendance()">Open Attendance</button>
  `;
}

function openAttendance() {
  const date = document.getElementById('datePicker').value;
  if (!date) return alert('Select a date');
  showAttendance(date);
}
```

---

### 5.3 Attendance View

```js
let currentSession = null;
let attendanceState = {};

async function showAttendance(date) {
  hideAll();
  attendanceView.hidden = false;

  const session = await apiGet(`/attendance/session?date=${date}`);
  const students = await apiGet('/students');

  currentSession = session;
  attendanceState = {};

  let html = `<h2>Attendance for ${date}</h2>`;

  students.forEach(s => {
    html += `
      <div class="student-row">
        <span>${s.name}</span>
        <label>
          <input type="radio" name="s-${s.id}"
            onchange="mark(${s.id}, 'present')"
            ${session.is_finalized ? 'disabled' : ''}>
          Present
        </label>
        <label>
          <input type="radio" name="s-${s.id}"
            onchange="mark(${s.id}, 'absent')"
            ${session.is_finalized ? 'disabled' : ''}>
          Absent
        </label>
      </div>
    `;
  });

  if (!session.is_finalized) {
    html += `
      <button onclick="saveAttendance()">Save</button>
      <button onclick="finalizeAttendance()">Finalize</button>
    `;
  } else {
    html += `<p><strong>Attendance finalized</strong></p>`;
  }

  attendanceView.innerHTML = html;
}

function mark(studentId, status) {
  attendanceState[studentId] = status;
}
```

---

### 5.4 Save & Finalize Attendance

```js
async function saveAttendance() {
  const records = Object.entries(attendanceState).map(
    ([student_id, status]) => ({
      student_id: Number(student_id),
      status
    })
  );

  await apiPost('/attendance/mark', {
    session_id: currentSession.id,
    records
  });

  alert('Attendance saved');
}

async function finalizeAttendance() {
  await apiPost('/attendance/finalize', {
    session_id: currentSession.id
  });

  alert('Attendance finalized');
  showCalendar();
}
```

---

### 5.5 Attendance Report View

```js
async function showReport() {
  hideAll();
  reportView.hidden = false;

  const rows = await apiGet('/report');

  let html = `
    <h2>Attendance Report</h2>
    <table>
      <tr>
        <th>Name</th>
        <th>Present</th>
        <th>Total</th>
        <th>%</th>
      </tr>
  `;

  rows.forEach(r => {
    html += `
      <tr>
        <td>${r.name}</td>
        <td>${r.present_days}</td>
        <td>${r.total_days}</td>
        <td>${r.present_percentage}%</td>
      </tr>
    `;
  });

  html += '</table>';
  reportView.innerHTML = html;
}
```

---

## 6. Add Student View

Allows adding new students directly to the database via the backend API.

```js
function showAddStudent() {
  hideAll();
  calendarView.hidden = false;

  calendarView.innerHTML = `
    <h2>Add Student</h2>

    <input type="text" id="studentName" placeholder="Student name" />
    <br/><br/>
    <input type="text" id="rollNo" placeholder="Roll number" />
    <br/><br/>
    <button onclick="addStudent()">Add</button>
  `;
}

async function addStudent() {
  const name = document.getElementById('studentName').value.trim();
  const rollNo = document.getElementById('rollNo').value.trim();

  if (!name || !rollNo) {
    return alert('Name and roll number are required');
  }

  try {
    await apiPost('/students', {
      name,
      roll_no: rollNo
    });

    alert('Student added');
    showCalendar();
  } catch (err) {
    alert('Failed to add student');
  }
}
```

---

## 7. Initial Load

```js
showCalendar();
```

---

## 7. Key Characteristics

* True single-page application
* No framework or bundler
* Backend-driven state
* Simple DOM manipulation
* Easy to debug and extend

---

## 8. Possible Enhancements

* Prefill attendance when revisiting a date
* Bulk mark all present / absent
* Role-based UI (admin / teacher)
* Improved styling
