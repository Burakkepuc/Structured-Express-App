'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Class, {
        through: 'StudentClass',
        foreignKey: 'studentId',
      });
    }
  }
  Student.init(
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'students',
      modelName: 'Student',
    }
  );
  return Student;
};
