const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [4, 'Username must be at least 4 characters long.'],
    validate: {
      validator: function (v) {
        return /[a-zA-Z0-9]+/.test(v);
      },
      message: () => 'Username should consist only English letters and digits.',
    },
  },

  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long.'],
  },

  amount: { type: Number, required: true, default: 0 },

  expenses: [{ type: mongoose.Types.ObjectId, ref: 'Expenses' }],

  salt: { type: String },
});

module.exports = mongoose.model('Users', userSchema);
