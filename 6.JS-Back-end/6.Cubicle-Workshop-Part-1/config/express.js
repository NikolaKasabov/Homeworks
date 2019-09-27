const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
  // TODO: Setup the view engine
  app.engine('.hbs', exphbs({ extname: '.hbs' }));
  app.set('view engine', '.hbs');

  // TODO: Setup the body parser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // TODO: Setup the static files
  app.use(express.static('static'));
};
