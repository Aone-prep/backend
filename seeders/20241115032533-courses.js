'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Courses', [
      {
        course_name: 'Introduction to Web Development',
        description: 'Learn the basics of HTML, CSS, and JavaScript.',
        duration: '3:00:00', // 3 hours
        level: 'Beginner',
        category_id: 1, // Assuming this ID exists in CourseCategory
        in_progress:0,
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        course_name: 'Advanced JavaScript',
        description: 'Deep dive into JavaScript, covering advanced topics like closures, promises, and async/await.',
        duration: '4:00:00', // 4 hours
        level: 'Advanced',
        category_id: 1, // Assuming this ID exists in CourseCategory
        in_progress:1,
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        course_name: 'Data Science with Python',
        description: 'Learn how to work with data using Python and popular libraries like Pandas, NumPy, and Matplotlib.',
        duration: '5:00:00', // 5 hours
        level: 'Intermediate',
        category_id: 2, // Assuming this ID exists in CourseCategory
        in_progress:1.5,
        rating: 3.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        course_name: 'Machine Learning Basics',
        description: 'Introduction to machine learning, focusing on algorithms and models.',
        duration: '6:00:00', // 6 hours
        level: 'Intermediate',
        category_id: 3, // Assuming this ID exists in CourseCategory
        in_progress:5,
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
