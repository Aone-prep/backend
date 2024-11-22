'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserCourses', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true, // Comment can be optional
      },
      progress: {
        type: Sequelize.INTEGER,
        defaultValue: 0, // Default to 0% progress
        validate: {
          min: 0,
          max: 100, // Ensuring progress is between 0 and 100
        },
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: true, // Rating can be optional (for when users rate the course)
        validate: {
          min: 1,
          max: 5, // Rating should be between 1 and 5 stars
        },
      },
      status: {
        type: Sequelize.ENUM,
        values: ['completed', 'not_completed'], // Enum to define course status
        defaultValue: 'not_completed', // Default to 'not_started'
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // Reference to the User model
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Courses',  // Reference to the Course model
          key: 'id',
        },
        onDelete: 'CASCADE',
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
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the UserCourses table
    await queryInterface.dropTable('UserCourses');
  },
};
