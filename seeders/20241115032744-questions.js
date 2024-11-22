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
      {
        description: 'Which of the following is the largest planet in our solar system?',
        optionA: 'Earth',
        optionB: 'Jupiter',
        optionC: 'Mars',
        optionD: 'Saturn',
        answer: 'B',
        created_by: 'admin',
        status: true,
        mock_test_id: 1, // Assuming this ID exists in MockTest table
        question_type_id: 1, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'What is the chemical symbol for water?',
        optionA: 'O2',
        optionB: 'CO2',
        optionC: 'H2O',
        optionD: 'O3',
        answer: 'C',
        created_by: 'admin',
        status: true,
        mock_test_id: 2, // Assuming this ID exists in MockTest table
        question_type_id: 1, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Who is known as the father of computers?',
        optionA: 'Albert Einstein',
        optionB: 'Charles Babbage',
        optionC: 'Isaac Newton',
        optionD: 'Bill Gates',
        answer: 'B',
        created_by: 'admin',
        status: true,
        mock_test_id: 3, // Assuming this ID exists in MockTest table
        question_type_id: 1, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'What is 7 * 6?',
        optionA: '42',
        optionB: '36',
        optionC: '49',
        optionD: '56',
        answer: 'A',
        created_by: 'admin',
        status: true,
        mock_test_id: 4, // Assuming this ID exists in MockTest table
        question_type_id: 2, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'What is the capital city of France?',
        optionA: 'Berlin',
        optionB: 'Madrid',
        optionC: 'Paris',
        optionD: 'Rome',
        answer: 'C',
        created_by: 'admin',
        status: true,
        mock_test_id: 1, // Assuming this ID exists in MockTest table
        question_type_id: 1, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'What is 10 / 2?',
        optionA: '5',
        optionB: '4',
        optionC: '3',
        optionD: '6',
        answer: 'A',
        created_by: 'admin',
        status: true,
        mock_test_id: 2, // Assuming this ID exists in MockTest table
        question_type_id: 2, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Which programming language is known as the "mother of all languages"?',
        optionA: 'C',
        optionB: 'Java',
        optionC: 'Assembly',
        optionD: 'Fortran',
        answer: 'A',
        created_by: 'admin',
        status: true,
        mock_test_id: 3, // Assuming this ID exists in MockTest table
        question_type_id: 1, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'What is the result of 15 - 7?',
        optionA: '7',
        optionB: '8',
        optionC: '9',
        optionD: '6',
        answer: 'B',
        created_by: 'admin',
        status: true,
        mock_test_id: 4, // Assuming this ID exists in MockTest table
        question_type_id: 2, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Which planet is known as the "Red Planet"?',
        optionA: 'Mars',
        optionB: 'Venus',
        optionC: 'Jupiter',
        optionD: 'Saturn',
        answer: 'A',
        created_by: 'admin',
        status: true,
        mock_test_id: 1, // Assuming this ID exists in MockTest table
        question_type_id: 1, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Who wrote "Romeo and Juliet"?',
        optionA: 'Charles Dickens',
        optionB: 'William Shakespeare',
        optionC: 'J.K. Rowling',
        optionD: 'Mark Twain',
        answer: 'B',
        created_by: 'admin',
        status: true,
        mock_test_id: 2, // Assuming this ID exists in MockTest table
        question_type_id: 1, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Which gas do plants absorb from the air during photosynthesis?',
        optionA: 'Oxygen',
        optionB: 'Carbon Dioxide',
        optionC: 'Nitrogen',
        optionD: 'Hydrogen',
        answer: 'B',
        created_by: 'admin',
        status: true,
        mock_test_id: 3, // Assuming this ID exists in MockTest table
        question_type_id: 1, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'What is the perimeter of a square with side length 5?',
        optionA: '10',
        optionB: '15',
        optionC: '20',
        optionD: '25',
        answer: 'C',
        created_by: 'admin',
        status: true,
        mock_test_id: 4, // Assuming this ID exists in MockTest table
        question_type_id: 2, // Assuming this ID exists in QuestionType table
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // This will delete all records from the Questions table
    await queryInterface.bulkDelete('Questions', null, {});
  }
};
