const mongoose = require('mongoose');

/**
 * Support Schema
 */
const SupportSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

/**
 * @typedef Support
 */
module.exports = mongoose.model('Support', SupportSchema);
