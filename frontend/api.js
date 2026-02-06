// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Axios instance setup
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Generic request helpers
async function apiGet(path) {
  const res = await axiosInstance.get(path);
  return res.data;
}

async function apiPost(path, body) {
  const res = await axiosInstance.post(path, body);
  return res.data;
}

// API Service Object
const api = {
  // Students
  getStudents: () => apiGet('/students'),
  
  addStudent: (name, rollNo) => apiPost('/students', { name, roll_no: rollNo }),

  // Attendance
  getAttendanceSession: (date) => apiGet(`/attendance/session?date=${date}`),
  
  saveAttendance: (sessionId, records) => apiPost('/attendance/mark', {
    session_id: sessionId,
    records
  }),
  
  finalizeAttendance: (sessionId) => apiPost('/attendance/finalize', {
    session_id: sessionId
  }),

  // Reports
  getReport: () => apiGet('/report')
};
