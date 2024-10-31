'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuestionType.hasOne(models.Question, {
        foreignKey: 'questiontype_id', // foreign key in Question model
        as: 'question' // alias for association
      });
    }
  }
  QuestionType.init({
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'QuestionType',
  });
  return QuestionType;
};