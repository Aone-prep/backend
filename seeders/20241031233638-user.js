'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      id: '1',
      first_name: 'admin',
      last_name: 'admin',
      username: 'admin',
      password: 'admin123', // Make sure to hash your password
      email: 'admin@gmail.com',
      role: 'admin',
      created_by: 'Superadmin',
      status: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
