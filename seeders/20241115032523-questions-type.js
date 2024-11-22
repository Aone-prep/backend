'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('QuestionTypes', [
      {
        name: 'Multiple Choice',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Single Choice',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // This will delete all records from the QuestionTypes table
    await queryInterface.bulkDelete('QuestionTypes', null, {});
  }
};
