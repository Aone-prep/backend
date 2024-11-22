'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.CourseCategory, {
        foreignKey: 'category_id', // Foreign key in the Course table
        as: 'category' // Alias for the association
      });
      Course.hasMany(models.MockTest, {
        foreignKey: 'course_id',
        as: 'mockTests'
      });

      Course.hasMany(models.Content, {
        foreignKey: 'courseId',  // Foreign key in Content model
        as: 'contents',  // Alias for the associated content
      });
    }
  }
  Course.init({
    course_name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.TIME,
    level: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
    // user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};