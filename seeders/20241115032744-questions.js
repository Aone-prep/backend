'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Questions', [
      {
        description: 'What is the capital of France?',
        optionA: 'Paris',
        optionB: 'London',
        optionC: 'Berlin',
        optionD: 'Madrid',
        answer: 'A',
        created_by: 'admin',
        status: true,
        mock_test_id: 1, // Assuming this ID exists in MockTest table
        question_type_id: 1, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'What is 5 + 5?',
        optionA: '10',
        optionB: '20',
        optionC: '15',
        optionD: '25',
        answer: 'A',
        created_by: 'admin',
        status: true,
        mock_test_id: 2, // Assuming this ID exists in MockTest table
        question_type_id: 2, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Which of the following is a programming language?',
        optionA: 'Python',
        optionB: 'JavaScript',
        optionC: 'HTML',
        optionD: 'All of the above',
        answer: 'D',
        created_by: 'admin',
        status: true,
        mock_test_id: 3, // Assuming this ID exists in MockTest table
        question_type_id: 1, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'What is the square root of 16?',
        optionA: '4',
        optionB: '5',
        optionC: '6',
        optionD: '3',
        answer: 'A',
        created_by: 'admin',
        status: true,
        mock_test_id: 4, // Assuming this ID exists in MockTest table
        question_type_id: 2, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // This will delete all records from the Questions table
    await queryInterface.bulkDelete('Questions', null, {});
  }
};
