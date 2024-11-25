'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs'); 

module.exports = {
  async up (queryInterface, Sequelize) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash('admin123', 10); 
    
    await queryInterface.bulkInsert('Users', [{
      id: 1, 
      first_name: 'admin',
      last_name: 'admin',
      username: 'admin',
      password: hashedPassword, 
      email: 'admin@gmail.com',
      role: 'admin',
      created_by: 'Superadmin', 
      status: true, 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    // Optionally, add a WHERE clause to delete specific users
    await queryInterface.bulkDelete('Users', { email: 'admin@gmail.com' }, {});
  }
};
