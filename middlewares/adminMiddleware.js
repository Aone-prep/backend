const { User } = require('../models');
// const adminMiddleware = (req, res, next) => {
//     if (req.user.role !== 'admin') {
//         return res.status(403).json({ message: 'Admin access required' });
//     }
//     next();
// };

// module.exports = adminMiddleware;
// const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(403).json({ message: 'Not authenticated' });
    }

next();
};

module.exports = adminMiddleware;