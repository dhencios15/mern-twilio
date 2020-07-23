const mongoose = require('mongoose');

const NumberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  to: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = Inbox = mongoose.model('Inbox', NumberSchema);
