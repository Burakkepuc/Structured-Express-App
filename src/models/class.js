'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Class.belongsTo(models.Instructor, {foreignKey: 'instructorId'});
      Class.belongsToMany(models.Student, {
        through: 'StudentClass',
        foreignKey: 'classId',
      });
    }
  }

  Class.init(
    {
      instructorId: DataTypes.INTEGER,
      classCode: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'classes',
      modelName: 'Class',
    }
  );
  return Class;
};
