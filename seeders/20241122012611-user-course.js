"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert sample data into UserCourses table
    await queryInterface.bulkInsert("UserCourses", [
      {
        user_id: 1,
        course_id: 1,
        comment: "Great course, learned a lot!",
        progress: 80, // Progress at 80%
        rating: 4, // Rating out of 5
        status: "in_progress", // Status of the course
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1, // Assume user with ID 2
        course_id: 2, // Assume course with ID 2
        comment: "Very challenging but rewarding.",
        progress: 50, // Progress at 50%
        rating: 3, // Rating out of 5
        status: "in_progress", // Status of the course
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1, // Assume user with ID 3
        course_id: 3, // Assume course with ID 1
        comment: "Excellent content and delivery.",
        progress: 100, // Progress at 100%
        rating: 5, // Rating out of 5
        status: "completed", // Status of the course
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback: Delete all records from UserCourses table
    await queryInterface.bulkDelete("UserCourses", null, {});
  },
};
