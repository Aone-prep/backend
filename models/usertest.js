'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserTest.belongsTo(models.Course, {
        foreignKey: 'course_id',
        onDelete: 'CASCADE'
      });

      UserTest.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });

      UserTest.belongsTo(models.MockTest, {
        foreignKey: 'mocktest_id',
        onDelete: 'CASCADE'
      });
    }
  }
  UserTest.init({
    course_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    mocktest_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTest',
  });
  return UserTest;
};