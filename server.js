const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/index');  // Import your models
const { exec } = require('child_process'); // For running CLI commands
const userRoute = require('./routes/user/userRoutes');
const adminRoute = require('./routes/admin/adminRoutes');

// Create an express app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Define routes
app.use('/user', userRoute);
app.use('/admin', adminRoute);

// Catch-all route for unhandled requests
app.use((req, res) => {
    res.status(404).json({ message: 'URL not found' });
});

// Function to create the database if it doesn't exist
async function createDatabaseIfNotExists() {
    try {
        const sequelizeWithoutDb = new db.Sequelize({
            host: db.sequelize.options.host,
            username: db.sequelize.options.username,
            password: db.sequelize.options.password,
            dialect: db.sequelize.options.dialect,
            logging: false,  // Optional: Disable query logging for the initial DB creation
        });

        // Create the database if it doesn't exist
        await sequelizeWithoutDb.query(`CREATE DATABASE IF NOT EXISTS ${db.sequelize.options.database};`);
        console.log(`Database ${db.sequelize.options.database} created or already exists.`);
        
        // Now that the database is created, connect using Sequelize
        await sequelizeWithoutDb.close(); // Close the connection to the "mysql" database
        return true;
    } catch (error) {
        console.error('Error creating database:', error);
        return false;
    }
}

// Function to check if the necessary data exists (e.g., if a user exists)
async function checkIfSeeded() {
    try {
        // Check if there's any data in a table (for example, 'users')
        const userCount = await db.User.count(); // Replace `User` with any model you want to check
        return userCount > 0; // If the count is greater than 0, return true, meaning data is already there
    } catch (err) {
        console.error('Error checking if data is seeded:', err);
        return false;
    }
}

// Function to run Sequelize seeders programmatically
async function runSeeders() {
    try {
        console.log('Running seeders...');
        await new Promise((resolve, reject) => {
            exec('npx sequelize-cli db:seed:all', (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error executing seeders: ${stderr}`);
                    reject(err);
                } else {
                    console.log(`Seeders executed successfully: ${stdout}`);
                    resolve(stdout);
                }
            });
        });
    } catch (error) {
        console.error('Error running seeders:', error);
        throw error; // Rethrow error if seeders fail
    }
}

// Sync Database, Run Seeders (only if needed), and Start Server
const PORT = process.env.PORT || 3030;

async function startServer() {
    const databaseCreated = await createDatabaseIfNotExists();

    if (!databaseCreated) {
        console.error('Failed to create the database. Server will not start.');
        return;
    }

    try {
        // Reinitialize the Sequelize instance with the correct database
        await db.sequelize.authenticate();
        console.log('Database connected successfully.');

        // Sync the models (create tables if they don’t exist)
        await db.sequelize.sync();
        console.log('Database synchronized successfully.');

        // Check if the necessary data exists
        const isSeeded = await checkIfSeeded();

        if (!isSeeded) {
            // If the data doesn't exist, run the seeders
            await runSeeders();
        } else {
            console.log('Data already seeded, skipping seeders.');
        }

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
        });

    } catch (err) {
        console.error('Failed to connect to the database or run seeders:', err);
    }
}

// Start the server
startServer();
