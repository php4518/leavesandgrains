const Order = require('../order/order.model');
const { orderType } = require('../../admin/helper');
const moment = require('moment');
/**
 * Get Order list.
 * @property {number} req.query.skip - Number of Order to be skipped.
 * @property {number} req.query.limit - Limit number of Order to be returned.
 * @returns {Order[]}
 */
async function getOrdersByDate(req, res, next) {
  let { date, type } = req.query;
  try {
    const start = moment(date).startOf('day').toISOString();
    const end = moment(date).endOf('day').toISOString();
    const dateRange = { $gte: start, $lt: end };
    const commonFields = {
      _id: 1,
      index: 1,
      customer: { $arrayElemAt: [ '$customer', 0 ] },
      address: { $arrayElemAt: [ '$address', 0 ] }
    };

    let pipeline;

    if(type === orderType.INDIVIDUAL_MEAL) {
      pipeline = [
        { $match: { 'individualMeals.deliveryDate' : dateRange, isCanceled: false } },
        { $unwind: { path: "$individualMeals", includeArrayIndex: "index" } },
        { $match: { 'individualMeals.deliveryDate' : dateRange } },
        { $lookup: { from: 'users', localField: 'customer', foreignField: '_id', as: 'customer' } },
        { $lookup: { from: 'addresses', localField: 'address', foreignField: '_id', as: 'address' } },
        { $project: { ...commonFields, individualMeals: 1 } },
      ];
    } else {
      pipeline = [
        { $match: { 'mealPlans.plan.deliveryDate' : dateRange, isCanceled: false } },
        { $unwind: { path: "$mealPlans", includeArrayIndex: "index" } },
        { $unwind: { path: "$mealPlans.plan", includeArrayIndex: "planIndex" } },
        { $match: { 'mealPlans.plan.deliveryDate' : dateRange } },
        { $lookup: { from: 'users', localField: 'customer', foreignField: '_id', as: 'customer' } },
        { $lookup: { from: 'addresses', localField: 'address', foreignField: '_id', as: 'address' } },
        { $unwind: { path: "$mealPlans.plan.items", includeArrayIndex: "itemIndex" } },
        { $project: { ...commonFields, mealPlans: 1, planIndex: 1, itemIndex: 1 } },
      ];
    }

    const data = await Order.matchAggregate(pipeline);

    return res.json(data);

/*
db.getCollection('orders').aggregate([
{ $unwind: "$individualMeals" },
{ $match:
    {
        'individualMeals.deliveryDate' : { $gte: "2021-05-17T00:00:00.000Z", $lt: "2021-05-18T00:00:00.000Z" }
    }
},
])
 */

    /*
    db.getCollection('orders').aggregate([
      { $project: {
    _id: 1,
    address: 1,
    customer: 1,
    mealPlans: 1
  } },
  { $unwind: '$mealPlans' },
  { $unwind: '$mealPlans.plan' },
  { $match: { 'mealPlans.plan.deliveryDate' : { $gte: "2021-05-21T00:00:00.000Z", $lt: "2021-05-22T00:00:00.000Z" } } }
] );
     */
    // TODO: implement limit when get better fetching
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getOrdersByDate,
};
