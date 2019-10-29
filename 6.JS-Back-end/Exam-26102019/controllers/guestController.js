const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');
const { saltRounds, jwtSecret } = require('../config/config');
const showNotification = require('../utils/showNotification');

module.exports = {
  homeGet: (req, res) => {
    res.render('home');
  },

  registerGet: (req, res) => {
    res.render('register');
  },

  registerPost: (req, res) => {
    let { username, password, repeatPassword, amount } = req.body;

    // validations
    const regex = new RegExp('^[a-zA-Z0-9]+$');

    if (username.length < 4 || !regex.test(username)) {
      showNotification(req, res,
        'register',
        'The username should be at least 4 characters long and should consist only english letters and digits.',
        {
          username,
          password,
          repeatPassword,
          amount,
        }
      );
      return;
    } else if (password.length < 8) {
      showNotification(req, res,
        'register',
        'The password should be at least 8 characters long.',
        {
          username,
          password,
          repeatPassword,
          amount,
        }
      );
      return;
    } else if (password !== repeatPassword) {
      showNotification(req, res,
        'register',
        'The repeat password should be equal to the password',
        {
          username,
          password,
          repeatPassword,
          amount,
        }
      );
      return;
    } else if (Number(amount) < 0) {
      showNotification(req, res,
        'register',
        'The account amount should be positive number.',
        {
          username,
          password,
          repeatPassword,
          amount,
        }
      );
      return;
    }

    if (amount === '') amount = 0;

    // hash the password
    bcrypt.genSalt(saltRounds)
      .then((salt) => {
        // pass the 'salt' and the 'hashed password' to the next .then() with Promise.all()
        return Promise.all([salt, bcrypt.hash(password, salt)]);
      })
      .then(([salt, hashedPass]) => {
        // add the new user to mongodb collection 'Users'
        return UserModel.create({ username, password: hashedPass, amount, salt });
      })
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err));
  },

  loginGet: (req, res) => {
    res.render('login');
  },

  loginPost: (req, res) => {
    const { username, password } = req.body;
    // check if username exists in 'Users' collection
    UserModel.findOne({ username })
      .then((userData) => {
        // if username is invalid
        if (!userData) {
          showNotification(req, res,
            'login',
            'The username or/and the password are invalid.',
            {
              username,
              password,
            }
          );
          // res.redirect('/login');
          return;
        }

        // check if password is valid
        bcrypt.compare(password, userData.password)
          .then((isPassValid) => {
            // if password is invalid
            if (!isPassValid) {
              showNotification(req, res,
                'login',
                'The username or/and the password are invalid.',
                {
                  username,
                  password,
                }
              );
              // res.redirect('/login');
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
