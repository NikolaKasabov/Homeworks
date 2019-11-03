const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');
const CourseModel = require('../models/Course');
const { saltRounds, jwtSecret } = require('../config/config');
const showNotification = require('../utils/showNotification');

module.exports = {
  homeGet: (req, res) => {
    CourseModel.aggregate([
      { '$match': { 'isPublic': true } },
      {
        '$project': {
          'title': 1,
          'isPublic': 1,
          'description': 1,
          'imageUrl': 1,
          'creatorId': 1,
          'createdAt': 1,
          'usersEnrolled': 1,
          'usersEnrolledCount': { '$size': '$usersEnrolled' }
        }
      },
      { '$sort': { 'usersEnrolledCount': -1 } },
      { '$limit': 3 }
    ])
      .then((courses) => {
        res.render('home/guest-home', { courses });
      })
      .catch((err) => console.log(err));
  },

  registerGet: (req, res) => {
    res.render('user/register');
  },

  registerPost: (req, res) => {
    const { username, password, repeatPassword } = req.body;

    // validations
    const regex = new RegExp('^[a-zA-Z0-9]+$');

    if (username.length < 5 || !regex.test(username)) {
      showNotification(req, res,
        'user/register',
        'The username should be at least 5 characters long and should consist only english letters and digits.',
        {
          username,
          password,
          repeatPassword,
        }
      );
      return;
    } else if (password.length < 5 || !regex.test(password)) {
      showNotification(req, res,
        'user/register',
        'The password should be at least 5 characters long and should consist only english letters and digits.',
        {
          username,
          password,
          repeatPassword,
        }
      );
      return;
    } else if (password !== repeatPassword) {
      showNotification(req, res,
        'user/register',
        'The repeat password should be equal to the password',
        {
          username,
          password,
          repeatPassword,
        }
      );
      return;
    }

    // hash the password
    bcrypt.genSalt(saltRounds)
      .then((salt) => {
        // pass the 'salt' and the 'hashed password' to the next .then() with Promise.all()
        return Promise.all([salt, bcrypt.hash(password, salt)]);
      })
      .then(([salt, hashedPass]) => {
        // add the new user to mongodb collection 'Users'
        return UserModel.create({ username, password: hashedPass, salt });
      })
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err));
  },

  loginGet: (req, res) => {
    res.render('user/login');
  },

  loginPost: (req, res) => {
    const { username, password } = req.body;

    // check if username exists in 'Users' collection
    UserModel.findOne({ username })
      .then((userData) => {
        // if username is invalid
        if (!userData) {
          res.redirect('/login');
          return;
        }

        // check if password is valid
        bcrypt.compare(password, userData.password)
          .then((isPassValid) => {
            // if password is invalid
            if (!isPassValid) {
              res.redirect('/login');
              return;
            }

            // create jwt and save it in a cookie
            const token = jwt.sign({
              userId: userData._id,
              username: userData.username,
            }, jwtSecret);
            res.cookie('jwt', token);
            res.redirect('/');
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
};
