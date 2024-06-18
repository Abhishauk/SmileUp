// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication failed. Token missing.' });
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.id };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed. Invalid token.' });
  }
};

module.exports = verifyToken;
