// const env = process.env.NODE_ENV || 'development';
const env = 'development';

const app = require('express')();
const config = require('./config/config')[env];
const connection = require('./config/database');

require('./config/express')(app);
require('./config/routes')(app);

connection.then(() => {
  app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
}).catch((err) => {
  console.log(err);
});
