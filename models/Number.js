const mongoose = require('mongoose');

const ContactNumberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  contactName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
});

module.exports = ContactNumber = mongoose.model(
  'ContactNumber',
  ContactNumberSchema
);
