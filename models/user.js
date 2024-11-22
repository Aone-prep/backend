"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserCourse, {
        foreignKey: "user_id",
        as: "userCourses",
      });

      // Many-to-Many with Course
      User.belongsToMany(models.Course, {
        through: models.UserCourse,
        foreignKey: "user_id",
        as: "courses",
      });

      // User Tests association
      User.hasMany(models.UserTest, {
        foreignKey: "user_id",
        as: "userTests",
      });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      created_by: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
