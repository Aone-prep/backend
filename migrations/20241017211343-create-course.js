'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      course_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.TIME
      },
      level: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false, // Make sure this is required
        references: {
          model: 'CourseCategories', // Name of the table you're referencing
          key: 'id' // The key in the CourseCategory table
        },
        onDelete: 'CASCADE' // Optional: Define behavior on delete
      },
    
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};