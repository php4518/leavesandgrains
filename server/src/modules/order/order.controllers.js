const Order = require('./order.model');

/**
 * Get Order list.
 * @property {number} req.query.skip - Number of Order to be skipped.
 * @property {number} req.query.limit - Limit number of Order to be returned.
 * @returns {Order[]}
 */
async function getAll(req, res, next) {
  let {filters = {}} = req.query;
  try {
    const orders = await Order.getAll(filters);
    return res.json(orders);
  } catch (error) {
    return next(error);
  }
}

/**
 * Add Order.
 * @returns {Order[]}
 */
async function add(req, res, next) {
  const order = new Order(req.body);
  try {
    await order.save();
    return res.json(order);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAll,
  add
};
