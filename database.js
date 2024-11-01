const mysql = require('mysql');
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',         // Your MySQL username
//     password: '',         // Your MySQL password
//     database: 'capstone'  // Your database name
// });

db.query(`CREATE DATABASE IF NOT EXISTS capstone`, (err) => {
    if (err) {
        console.error('Error creating database:', err.stack);
        return;
    }
    console.log('Database checked/created successfully.');

    // Switch to the 'capstone' database
    db.changeUser({ database: 'capstone' }, (err) => {
        if (err) {
            console.error('Error switching to the database:', err.stack);
            return;
        }
        console.log('Connected to the capstone database');
    });
});
const db = mysql.createConnection({
    host: 'aoneprep-sql-server.database.windows.net',
    user: 'adminuser',         // Your MySQL username
    password: 'P@ssw0rd1234!',         // Your MySQL password
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