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