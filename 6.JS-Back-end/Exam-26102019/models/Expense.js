const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  merchant: { type: String, required: true },

  date: { type: Date, default: Date.now },
  
  total: { type: Number, required: true },

  category: { type: String, required: true },
  
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50,
  },
  
  report: { type: Boolean, default: false },

  creatorId: { type: mongoose.Types.ObjectId, ref: 'Users'},
});

module.exports = mongoose.model('Expenses', expenseSchema);