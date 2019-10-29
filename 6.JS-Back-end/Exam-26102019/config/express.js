const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const ifLoggedAddUserToReq = require('../middlewares/ifLoggedAddUserToReq');

module.exports = (app) => {
  // Setup the view engine without using the 'default layout' page
  app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: false }));
  app.set('view engine', '.hbs');

  // Setup the body parser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Setup the static files
  app.use(express.static('static'));

  // Register 'cookie-parser' middleware
  app.use(cookieParser());

  // Register middleware for 'log in' check
  app.use(ifLoggedAddUserToReq);
};
