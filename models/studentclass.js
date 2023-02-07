'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  StudentClass.init(
    {
      classId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'students_classes',
      modelName: 'StudentClass',
    }
  );
  return StudentClass;
};
