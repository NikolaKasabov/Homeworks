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

  app.get('/register', guestController.registerGet);
  app.post('/register', guestController.registerPost);
  app.get('/login', guestController.loginGet);
  app.post('/login', guestController.loginPost);


  app.get('/addExpense', redirectIfNotLogged, userController.addExpenseGet);
  app.post('/addExpense', redirectIfNotLogged, userController.addExpensePost);
  app.get('/report/:expenseId', redirectIfNotLogged, userController.reportGet);
  app.get('/deleteExpense/:expenseId', redirectIfNotLogged, userController.deleteExpenseGet);
  app.post('/refill', redirectIfNotLogged, userController.refillPost);
  app.get('/profile/:userId', userController.accountInfoGet);
  app.get('/logout', redirectIfNotLogged, userController.logoutGet);

  app.all('*', (req, res) => res.render('404', {
    isNotLogged: !req.userData,
  }));
};
