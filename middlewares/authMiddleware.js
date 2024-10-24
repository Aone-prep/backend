// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(403).json({ message: 'Token is required' });

//     jwt.verify(token, 'secretkey', (err, user) => {
//         if (err) return res.status(403).json({ message: 'Invalid token' });
//         req.user = user; // Store user data for future requests
//         next();
//     });
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token after 'Bearer'
    if (!token) return res.status(401).json({ message: 'Token is required' });

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user; // Store user data for future requests
        next();
    });
};

module.exports = authMiddleware;
