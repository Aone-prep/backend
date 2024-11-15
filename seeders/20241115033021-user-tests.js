'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Insert multiple UserTest records using valid foreign key references.
    await queryInterface.bulkInsert('UserTests', [
      {
        course_id: 1, // Assign a course from the fetched list
        user_id: 1,     // Assign a user from the fetched list
        mocktest_id: 1, // Assign a mocktest from the fetched list
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        course_id: 2,
        user_id: 1,
        mocktest_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        course_id: 1,
        user_id: 1,
        mocktest_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // This will delete all records from the UserTests table
    await queryInterface.bulkDelete('UserTests', null, {});
  }
};
