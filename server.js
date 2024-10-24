
// const db = require('./models/index');
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const userRoutes = require('./routes/userRoutes');


// const app = express();

// // Middlewares
// app.use(cors());
// app.use(bodyParser.json());

// // User routes
// app.use('/api', userRoutes);

// // Sync Database
// db.sequelize.sync().then(() => {
//     console.log('Database connected and synchronized');
// });

// const PORT = 3030;

// // Start the server and listen on the specified port
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}/`);
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const db = require('./models/index');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// User routes
app.use('/api', userRoutes);

// Catch-all route for unhandled requests
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Sync Database and Start Server
const PORT = process.env.PORT || 3030;

db.sequelize.sync()
    .then(() => {
        console.log('Database connected and synchronized');
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
        });
    })
    .catch((err) => {
        console.error('Failed to synchronize database:', err);
    });