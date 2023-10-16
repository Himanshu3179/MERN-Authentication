const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token expired or invalid' });
            }

            req.user = user; // Add the user information to the request object
            next();
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = authenticateToken;
