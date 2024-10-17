const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load environment variables

// Create a connection to MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('MySQL connected'))
  .catch(err => console.error('Error connecting to MySQL:', err));
