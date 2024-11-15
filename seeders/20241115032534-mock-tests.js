'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch IDs of existing courses to use in the seeding process
  //   const courses = await queryInterface.sequelize.query(
  //     `SELECT id FROM \`Courses\` `, { type: Sequelize.QueryTypes.SELECT }
  //   );
    
  //  const mapped_course= courses.map(course=>{
  //     return {
  //       name: 'Math Mock Test 1',
  //       description: 'A challenging math test covering algebra and calculus.',
  //       duration: '01:30:00',  // 1 hour 30 minutes
  //       status: true,
  //       max_score: 100,
  //       course_id: course.id, // Assign a course from the fetched list
  //       createdAt: new Date(),
  //       updatedAt: new Date()
  //     }
  //   })
  //   console.log(mapped_course);
    // Insert multiple MockTest records using valid foreign key references
    await queryInterface.bulkInsert('MockTests', [
      {
        name: 'Math Mock Test 1',
        description: 'A challenging math test covering algebra and calculus.',
        duration: '01:30:00',  // 1 hour 30 minutes
        status: true,
        max_score: 100,
        course_id: 1, // Assign a course from the fetched list
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Science Mock Test 1',
        description: 'A science test covering physics and chemistry topics.',
        duration: '01:00:00',  // 1 hour
        status: true,
        max_score: 80,
        course_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'History Mock Test 1',
        description: 'A history test focusing on modern history events.',
        duration: '02:00:00',  // 2 hours
        status: true,
        max_score: 120,
        course_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'English Mock Test 1',
        description: 'An English test assessing grammar and writing skills.',
        duration: '01:00:00',  // 1 hour
        status: true,
        max_score: 100,
        course_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // This will delete all records from the MockTests table
    await queryInterface.bulkDelete('MockTests', null, {});
  }
};
