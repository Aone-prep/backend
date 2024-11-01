'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CourseCategory.hasOne(models.Course, {
        foreignKey: 'category_id',
        as: 'course'
      });
    }
  }
  CourseCategory.init({
    category_name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CourseCategory',
  });
  return CourseCategory;
};