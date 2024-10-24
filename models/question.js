'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init({
    description: DataTypes.STRING,
    optionA: DataTypes.STRING,
    optionB: DataTypes.STRING,
    optionC: DataTypes.STRING,
    optionD: DataTypes.STRING,
    answer: DataTypes.STRING,
    created_by: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    mocktest_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};