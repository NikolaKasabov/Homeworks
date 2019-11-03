const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

module.exports = (req, res, next) => {
  // if user is logged(there is a cookie with a jwt inside, and the jwt is valid), add user data to the 'req' object
  const token = req.cookies.jwt;

  if (token) {
    const userData = jwt.verify(token, jwtSecret);
    req.userData = userData;
  }

  next();
};
