const jwt = require('jsonwebtoken');

// const excludePaths = ['/api/users/register'];

const authenticateToken = (req, res, next) => {
  if (req.method === 'POST') {
    return next();
  }

  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied. Token is missing.' });

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
