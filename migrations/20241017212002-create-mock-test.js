'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MockTests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.TIME
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      max_score: {
        type: Sequelize.INTEGER
      },
      // result_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references:{
      //     model:'Results',
      //     key: 'id',
      //   },
      //   onDelete: 'CASCADE' 
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MockTests');
  }
};