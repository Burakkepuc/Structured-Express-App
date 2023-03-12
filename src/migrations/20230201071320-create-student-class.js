'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudentClasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      classId: {
        // Class hasMany Students m:n
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Class',
          key: 'id',
        },
      },
      studentId: {
        //Student has many Classes n:m
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Student',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudentClasses');
  },
};
