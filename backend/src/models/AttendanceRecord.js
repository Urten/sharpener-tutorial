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