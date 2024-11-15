'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CourseCategories', [
      {
        category_name: 'Web Development',
        status: true, // Active category
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Data Science',
        status: true, // Active category
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Machine Learning',
        status: false, // Inactive category
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Cybersecurity',
        status: true, // Active category
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // This will delete all records from the CourseCategories table
    await queryInterface.bulkDelete('CourseCategories', null, {});
  }
};
