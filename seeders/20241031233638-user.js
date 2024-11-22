'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs'); // For hashing passwords

module.exports = {
  async up (queryInterface, Sequelize) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash('admin123', 10); // 10 is the salt rounds
    
    await queryInterface.bulkInsert('Users', [{
      id: 1, // Use an integer for the ID if it's defined as INTEGER
      first_name: 'admin',
      last_name: 'admin',
      username: 'admin',
      password: 'password123', // Store the hashed password
      email: 'admin@gmail.com',
      role: 'admin',
      created_by: 'Superadmin', // Assuming this is a string or related to another table
      status: true, // Ensure this is a boolean, or use 1 if it's an integer
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    // Optionally, add a WHERE clause to delete specific users
    await queryInterface.bulkDelete('Users', { email: 'admin@gmail.com' }, {});
  }
};
