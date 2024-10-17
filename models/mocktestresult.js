'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MockTestResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MockTestResult.init({
    mock_test_id: DataTypes.INTEGER,
    result_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MockTestResult',
  });
  return MockTestResult;
};