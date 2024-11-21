'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Content.belongsTo(models.Course, {
        foreignKey: 'courseId',  // Foreign key in Content model
        as: 'course',  // Alias for the associated course
      });
    }
  }
  Content.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    courseId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    mediaUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};