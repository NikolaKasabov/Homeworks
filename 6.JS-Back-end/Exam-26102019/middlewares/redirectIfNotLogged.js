const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  // if there is no jwt in cookies or is invalid, redirect to '/login'
  jwt.verify(token, jwtSecret, (err, data) => {
    if (err) {
      res.redirect('/login');
    } else {
      next();
    }
  });
};
