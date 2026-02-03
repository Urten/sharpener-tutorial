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