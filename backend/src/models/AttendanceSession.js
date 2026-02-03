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