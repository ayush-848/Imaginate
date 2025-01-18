const jwt = require('jsonwebtoken');

const authenticated = (req, res, next) => {
    const token = req.cookies.jwtToken || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({
            success: false,
            message: "Authentication required. Please log in to access this feature."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};


module.exports = authenticated;
