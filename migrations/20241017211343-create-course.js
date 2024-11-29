'use strict';

const { sequelize } = require('../models');

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
      rating: {
        type: Sequelize.BOOLEAN
      },
      status:{
        type: Sequelize.BOOLEAN
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'CourseCategories', 
          key: 'id' 
        },
        onDelete: 'CASCADE' 
      },
    
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};