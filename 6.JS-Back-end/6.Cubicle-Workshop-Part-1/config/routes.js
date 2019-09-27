const controllers = require('../controllers/controllers');

module.exports = (app) => {
  // TODO...
  app.get('/', controllers.home);
  app.get('/about', controllers.about);
  app.get('/create', controllers.createGet);
  app.post('/create', controllers.createPost);
  app.get('/details/:id', controllers.details);
  app.all('*', controllers.error);
};
