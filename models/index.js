const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.course = require("./course.model.js")(sequelize, Sequelize);
// db.courseCategory = require("./courseCategory.model.js")(sequelize, Sequelize);
// db.mockTest = require("./mockTest.model.js")(sequelize, Sequelize);
// db.mockTestResult = require("./mockTestResult.model.js")(sequelize, Sequelize);
// db.profile = require("./profile.model.js")(sequelize, Sequelize);
// db.question = require("./question.model.js")(sequelize, Sequelize);
// db.result = require("./result.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
// db.userTest = require("./userTest.model.js")(sequelize, Sequelize);

// Define relationships here
// db.course.belongsTo(db.courseCategory, {foreignKey: "category_id"});
// db.course.belongsTo(db.user, {foreignKey: "user_id"});
// db.mockTestResult.belongsTo(db.mockTest, {foreignKey: "mock_test_id"});
// db.mockTestResult.belongsTo(db.result, {foreignKey: "result_id"});
// db.profile.belongsTo(db.user, {foreignKey: "user_id"});
// db.question.belongsTo(db.mockTest, {foreignKey: "test_id"});
// db.userTest.belongsTo(db.course, {foreignKey: "course_id"});
// db.userTest.belongsTo(db.user, {foreignKey: "user_id"});
// db.userTest.belongsTo(db.mockTest, {foreignKey: "test_id"});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;
