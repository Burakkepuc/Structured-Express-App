'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instructor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Instructor.belongsTo(models.Subject, {foreignKey: 'subjectId'});
      Instructor.hasMany(models.Class, {foreignKey: 'instructorId'});
    }
  }
  Instructor.init(
    {
      instructorDegree: DataTypes.STRING,
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      subjectId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'instructors',
      modelName: 'Instructor',
    }
  );
  return Instructor;
};
