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
      Question.belongsTo(models.QuestionType, {
        foreignKey: 'question_type_id', // Foreign key in Question model
        as: 'questionType' // Alias for the association
      });
      Question.belongsTo(models.MockTest, {
        foreignKey: 'mock_test_id', // Foreign key in Question model
        as: 'mockTest' // Alias for the association
      });
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
    mock_test_id: DataTypes.INTEGER,
    question_type_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};