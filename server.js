
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
const db = require('./models/index');
const userRoute = require('./routes/user/userRoutes')
const adminRoute = require('./routes/admin/adminRoutes')

// const roleRoute = require('./roleRoutes')

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// User routes
app.use('/user',userRoute);
app.use('/admin',adminRoute);

// Catch-all route for unhandled requests
app.use((req, res) => {
    res.status(404).json({ message: 'URL not found' });
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