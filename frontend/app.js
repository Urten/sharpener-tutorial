const calendarView = document.getElementById('calendar-view');
const attendanceView = document.getElementById('attendance-view');
const reportView = document.getElementById('report-view');

function hideAll() {
  calendarView.hidden = true;
  attendanceView.hidden = true;
  reportView.hidden = true;
}

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

let currentSession = null;
let attendanceState = {};

async function showAttendance(date) {
  hideAll();
  attendanceView.hidden = false;

  const session = await api.getAttendanceSession(date);
  const students = await api.getStudents();

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

async function saveAttendance() {
  const records = Object.entries(attendanceState).map(
    ([student_id, status]) => ({
      student_id: Number(student_id),
      status
    })
  );

  await api.saveAttendance(currentSession.id, records);

  alert('Attendance saved');
}

async function finalizeAttendance() {
  await api.finalizeAttendance(currentSession.id);

  alert('Attendance finalized');
  showCalendar();
}

async function showReport() {
  hideAll();
  reportView.hidden = false;

  const rows = await api.getReport();

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
    await api.addStudent(name, rollNo);

    alert('Student added');
    showCalendar();
  } catch (err) {
    alert('Failed to add student');
  }
}

// Initial load
showCalendar();
