const jwt = require('jsonwebtoken');
const User=require('../models/userModel')

const authenticated = async (req, res, next) => {
    const token = req.cookies.jwtToken;

    if (!token) {
        return res.status(403).json({
            success: false,
            message: "Authentication required. Please log in to access this feature."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        
                // Fetch user details from the database
                const user = await User.findById(req.userId);
                if (!user) {
                    throw new Error('User not found');
                }
        req.user=user
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};


module.exports = authenticated;
