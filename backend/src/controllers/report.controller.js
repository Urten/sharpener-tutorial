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