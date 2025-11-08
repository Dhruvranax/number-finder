const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('authHeader:', authHeader);

  if (!authHeader) {
    return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
  }

  let token = authHeader;
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  console.log('token:', token);

  if (!token) {
    return res.status(403).json({ message: 'Unauthorized, JWT token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: 'Unauthorized, JWT token invalid or expired' });
  }
};

module.exports = ensureAuthenticated;
