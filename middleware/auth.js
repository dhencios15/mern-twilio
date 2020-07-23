const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // GET TOKEN FROM HEADER
  const token = req.header('x-auth-token');

  // CHECK IF NO TOKEN
  if (!token) {
    return res.status(401).json({ msg: 'NO TOKEN, AUTHORIZATION DENIED' });
  }

  // VERIFY TOKEN
  try {
    const decoded = jwt.verify(token, config.get('JWT_SECRET'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'TOKEN IS NOT VALID' });
  }
};
