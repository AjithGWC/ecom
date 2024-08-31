const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authenticateAdmin = (req, res, next) => {
    let token = req.cookies.token || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: "No active token." });
    }

    // Remove "Bearer " prefix if it exists
    if (token.startsWith('Bearer ')) {
        token = token.replace('Bearer ', '');
    }

    try {
        console.log(token); // Now logs the token without "Bearer "
        const decoded = jwt.verify(token, jwtSecretKey);

        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }

        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token." });
    }
};

module.exports = authenticateAdmin;
