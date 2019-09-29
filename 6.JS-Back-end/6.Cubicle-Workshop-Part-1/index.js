const env = process.env.NODE_ENV || 'development';

const app = require('express')();
const config = require('./config/config')[env];

require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
