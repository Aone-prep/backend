'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Result.belongsTo(models.MockTest, {
        foreignKey: 'result_id', // Foreign key in Result table linking to MockTest
        as: 'mockTest',          // Alias for accessing the associated MockTest
        onDelete: 'CASCADE'  // Optional: cascade delete of result when MockTest is deleted
            
      });
    }
  }
  Result.init({
    description: DataTypes.STRING,
    obtained_mark: DataTypes.INTEGER,
    pass_mark: DataTypes.INTEGER,
    full_mark: DataTypes.INTEGER,
    highest_mark: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Result',
  });
  return Result;
};