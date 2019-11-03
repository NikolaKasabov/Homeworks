const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String,
    required: true,
    maxlength: 50,
  },

  imageUrl: {
    type: String,
    required: true
  },

  isPublic: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  usersEnrolled: [{
    type: mongoose.Types.ObjectId,
    ref: 'Users'
  }],

  creatorId: { type: mongoose.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Courses', courseSchema);