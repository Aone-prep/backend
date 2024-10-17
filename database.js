const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',         // Your MySQL username
    password: '',         // Your MySQL password
    database: 'capstone'  // Your database name
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});
module.exports = db;