'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MockTest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // MockTest.hasOne(models.Result, {
      //   foreignKey: 'result_id',  // Add foreignKey in the Result table
      //   as: 'result',              // Alias for accessing the associated Result
      //   onDelete: 'CASCADE',       // Optional: cascade deletion of the Result if MockTest is deleted
      // });
      MockTest.hasOne(models.Question, {
        foreignKey: 'mocktest_id', // foreign key in Question model
        as: 'question' // alias for association
      });
    }
  }
  MockTest.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.TIME,
    status: DataTypes.BOOLEAN,
    max_score: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'MockTest',
  });
  return MockTest;
};