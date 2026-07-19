const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.get('Authorization');

    if(!authHeader) {
        return res.status(401).json({
            error: 'Authorization header missing'
        });
    }

    const [scheme, token] = authHeader.split(' ');

    if(scheme !== "Bearer" || !token) {
        return res.status(401).json({
            error: 'Token format must be Bearer <token>'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;

        next();
    } catch(err) {
        return res.status(401).json({
            error: 'Invalid or expired token'
        });
    }
}

module.exports = authMiddleware;