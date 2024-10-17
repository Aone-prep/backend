// Import the http module
const http = require('http');
const db = require('./models/index');

// Create an HTTP server
const server = http.createServer((req, res) => {
    res.statusCode = 200; // Set the response status code to 200 (OK)
    res.setHeader('Content-Type', 'text/plain'); // Set the content type to plain text
    res.end('Hello, World!\n'); // Send the response
});

// Sync database
db.sequelize.sync();
// Define the port number
const PORT = 3030;

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
