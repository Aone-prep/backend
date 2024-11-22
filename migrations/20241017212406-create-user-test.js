'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserTests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      obtained_mark: {
        type: Sequelize.INTEGER
      },
      pass_mark: {
        type: Sequelize.INTEGER
      },
      full_mark: {
        type: Sequelize.INTEGER
      },
      highest_mark: {
        type: Sequelize.INTEGER
      },
      passed: {
        type: Sequelize.BOOLEAN
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      mocktest_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'MockTests',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserTests');
  }
};