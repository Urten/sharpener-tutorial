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