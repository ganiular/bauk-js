const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config.js');

const authenticateUser = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Verify the token
    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        // Attach the decoded token payload to the request object
        req.user = payload;
        next();
    });
};

const authorizeUserRole = (role) => {
    return (req, res, next) => {
        // Check if user role matches the required role
        if (req.user && req.user.role === role) {
            next();
        } else {
            return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }
    };
};


module.exports = {
    authenticateUser,
    authorizeUserRole
}