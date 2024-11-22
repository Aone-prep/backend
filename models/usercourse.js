'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserCourse = sequelize.define('UserCourse', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true, // Comment can be optional
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Progress will start at 0 (e.g., 0% progress)
      validate: {
        min: 0,
        max: 100, // You can restrict the progress between 0 and 100
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true, // Rating can be optional (if users can rate after completion)
      validate: {
        min: 0,
        max: 5, // Assuming the rating is between 1 and 5 stars
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: ['in_progress', 'completed', 'not_started'], // Possible statuses
      defaultValue: 'not_started', // Default status
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',  // Reference to User model
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Courses',  // Reference to Course model
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'UserCourses', // Optional, specify if table name is different from the pluralized model name
  });

  // Associations
  UserCourse.associate = function(models) {
    // Each UserCourse belongs to a User
    UserCourse.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    // Each UserCourse belongs to a Course
    UserCourse.belongsTo(models.Course, {
      foreignKey: 'course_id',
      as: 'course',
    });
  };

  return UserCourse;
};
