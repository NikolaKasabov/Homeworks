const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const ExpenseModel = require('../models/Expense');

const showNotification = require('../utils/showNotification');
const redirectIfNotLogged = require('../middlewares/redirectIfNotLogged');

const { jwtSecret } = require('../config/config');

module.exports = {
  homeGet: (req, res) => {
    const { userId } = req.userData;

    ExpenseModel.find({ 'creatorId': userId })
      .then((expenses) => {
        res.render('expenses', {
          expenses,
          userId: req.userData.userId,
          username: req.userData.username,
        });
      })
      .catch((err) => console.log(err))
  },

  addExpenseGet: (req, res) => {
    res.render('new-expense', {
      username: req.userData.username,
      userId: req.userData.userId,
    });
  },

  addExpensePost: (req, res) => {
    let { merchant, total, vault, category, description, report } = req.body;
    if (report === 'on') report = true;

    if (merchant.length < 4) {
      showNotification(req, res,
        'new-expense',
        'The merchant should be at least 4 characters long.',
        {
          merchant, total, category, description, report,
        }
      );
      return;
    } else if (!category) {
      showNotification(req, res,
        'new-expense',
        'The category should one from the given options.',
        {
          merchant, total, category, description, report,
        }
      );
      return;
    } else if (description.length < 10 || description.length > 50) {
      showNotification(req, res,
        'new-expense',
        'The description should be minimum 10 characters long and 50 characters maximum.',
        {
          merchant, total, category, description, report,
        }
      );
      return;
    }

    const creatorId = req.userData.userId;

    ExpenseModel.create({ merchant, total, category, description, report, creatorId })
      .then((expense) => {
        const expenseId = expense._id;

        UserModel.findByIdAndUpdate(req.userData.userId,
          { $push: { expenses: expenseId } })
          .then(() => res.redirect('/'))
          .catch((err) => console.log(err));

        // res.redirect('/')
      })
      .catch((err) => console.log(err));
  },

  reportGet: (req, res) => {
    const { expenseId } = req.params;

    // get expense data
    ExpenseModel.findById(expenseId)
      .then((expense) => {
        res.render('report', {
          username: req.userData.username,
          userId: req.userData.userId,
          expense,
        });
      })
      .catch((err) => console.log(err));
  },

  deleteExpenseGet: (req, res) => {
    const { expenseId } = req.params;

    ExpenseModel.findByIdAndDelete(expenseId)
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err));
  },

  refillPost: (req, res) => {
    let { refill } = req.body;
    const { userId } = req.userData;

    if (!refill) refill = 0;

    UserModel.findByIdAndUpdate(userId,
      { $inc: { 'amount': Number(refill) } })
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err));
  },

  accountInfoGet: (req, res) => {
    const { userId } = req.params;
    UserModel.findById(userId)
      .populate('expenses')
      .then((user) => {
        const userAmount = user.amount;
        const expensesArr = user.expenses;

        const totalAmount = expensesArr.reduce((acc, cur) => acc + Number(cur.total), 0);
        const totalMerches = expensesArr.length;

        res.render('account-info', {
          username: req.userData.username,
          userId: req.userData.userId,
          totalAmount,
          totalMerches,
          userAmount,
        });
      })
      .catch((err) => console.log(err));



  },

  logoutGet: (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
  },
}