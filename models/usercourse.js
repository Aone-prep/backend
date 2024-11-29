"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserCourse = sequelize.define(
    "UserCourse",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100,
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
          max: 5,
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ["in_progress", "completed",],
        defaultValue: "in_progress",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Courses",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "UserCourses",
    }
  );

  UserCourse.associate = function (models) {
    UserCourse.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    UserCourse.belongsTo(models.Course, {
      foreignKey: "course_id",
      as: "course",
    });
  };

  return UserCourse;
};
