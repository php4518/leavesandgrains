const mongoose = require('mongoose');
/**
 * Order Schema
 */
const OrderSchema = new mongoose.Schema({
  individualMeals: {
    type: Array,
    default: []
  },
  mealPlans: {
    type: Array,
    default: []
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isCanceled: {
    type: Boolean,
    default: false,
  },
  cancellationReason: {
    type: String,
  },
  paymentDetails: {
    type: Object,
  },
  totalAmount: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
});

/**
 * Statics
 */
OrderSchema.statics = {
  getAll(filter = {}) {
    return this.find(filter)
      .sort({createdAt: -1})
      .exec();
  },
  matchAggregate(pipeline = []) {
    return this.aggregate(pipeline);
  },
};

/**
 * @typedef Order
 */
module.exports = mongoose.model('Order', OrderSchema);
