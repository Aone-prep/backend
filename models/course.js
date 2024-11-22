"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Many-to-Many relationship with User through UserCourse
      Course.belongsToMany(models.User, {
        through: models.UserCourse,
        foreignKey: "course_id",
        as: "users",
      });

      // Direct access to UserCourse records
      Course.hasMany(models.UserCourse, {
        foreignKey: "course_id",
        as: "enrollments",
      });

      // Existing relationships
      Course.belongsTo(models.CourseCategory, {
        foreignKey: "category_id",
        as: "category",
      });

      Course.hasMany(models.MockTest, {
        foreignKey: "course_id",
        as: "mockTests",
      });

      Course.hasMany(models.Content, {
        foreignKey: "courseId",
        as: "contents",
      });
    }
  }
  Course.init(
    {
      course_name: DataTypes.STRING,
      description: DataTypes.STRING,
      duration: DataTypes.TIME,
      level: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      rating: DataTypes.FLOAT,
      // user_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
