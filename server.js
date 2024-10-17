
const db = require('./models/index');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');


const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// User routes
app.use('/api', userRoutes);

// Sync Database
db.sequelize.sync().then(() => {
    console.log('Database connected and synchronized');
});

const PORT = 3030;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
