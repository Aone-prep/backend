const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/index');  // Import your models
const userRoute = require('./routes/user/userRoutes');
const adminRoute = require('./routes/admin/adminRoutes');
const allRoute = require('./routes/Routes');

// Create an express app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Define routes
app.use('/user', userRoute);
app.use('/admin', adminRoute);
// app.use('/all', allRoute)

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

// Sync Database and Start Server
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

        // Sync the models
        await db.sequelize.sync();
        console.log('Database synchronized successfully.');

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
        });

    } catch (err) {
        console.error('Failed to connect to the database:', err);
    }
}

// Start the server
startServer();
