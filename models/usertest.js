'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTest = sequelize.define('UserTest', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    obtained_mark: {
      type: DataTypes.INTEGER,
    },
    pass_mark: {
      type: DataTypes.INTEGER,
    },
    full_mark: {
      type: DataTypes.INTEGER,
    },
    highest_mark: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    mocktest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MockTests',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'UserTests', // Optional, specify if table name is different from the pluralized model name
  });

  // Associations
  UserTest.associate = function(models) {
    // Each UserTest belongs to a User
    UserTest.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    // Each UserTest belongs to a MockTest
    UserTest.belongsTo(models.MockTest, {
      foreignKey: 'mocktest_id',
      as: 'mockTest',
    });
  };

  return UserTest;
};
