const jwt = require('jsonwebtoken');
require('dotenv').config();

// Création d'un token d'authentification 
module.exports = (req, res, next) => {
    try {
        console.log('Authorization header:', req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        console.error('Error during token verification:', error);
        res.status(403).json({ message: 'unauthorized request'})
    }
};

