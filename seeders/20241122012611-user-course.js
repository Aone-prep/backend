"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkInsert("UserCourses", [
      {
        user_id: 1,
        course_id: 1,
        comment: "Great course, learned a lot!",
        progress: 80, 
        rating: 4, 
        status: "in_progress", 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1, 
        course_id: 2, 
        comment: "Very challenging but rewarding.",
        progress: 50, 
        rating: 3, 
        status: "in_progress", 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1, 
        course_id: 3,
        comment: "Excellent content and delivery.",
        progress: 100, 
        rating: 5, 
        status: "completed", 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("UserCourses", null, {});
  },
};
