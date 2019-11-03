const guestController = require('../controllers/guestController');
const userController = require('../controllers/userController');

const redirectIfNotLogged = require('../middlewares/redirectIfNotLogged');

module.exports = (app) => {
  app.get('/', (req, res) => {
    if (req.userData) {
      return userController.homeGet(req, res);
    }

    return guestController.homeGet(req, res);
  });
  app.post('/', redirectIfNotLogged, userController.homePost);

  app.get('/register', guestController.registerGet);
  app.post('/register', guestController.registerPost);
  app.get('/login', guestController.loginGet);
  app.post('/login', guestController.loginPost);

  app.get('/course/create', redirectIfNotLogged, userController.createCourseGet);
  app.post('/course/create', redirectIfNotLogged, userController.createCoursePost);
  app.get('/course/details/:courseId', redirectIfNotLogged, userController.courseDetailsGet);
  app.get('/course/enroll/:courseId', redirectIfNotLogged, userController.courseEnrollGet);
  app.get('/course/edit/:courseId', redirectIfNotLogged, userController.courseEditGet);
  app.post('/course/edit/:courseId', redirectIfNotLogged, userController.courseEditPost);
  app.get('/course/delete/:courseId', redirectIfNotLogged, userController.courseDeleteGet);
  app.get('/logout', redirectIfNotLogged, userController.logoutGet);

  app.all('*', (req, res) => res.render('404'));
};
