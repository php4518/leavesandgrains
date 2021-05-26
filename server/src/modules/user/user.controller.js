const User = require('./user.model');
const otpGenerator = require('otp-generator');
const config = require('../../config')
const APIError = require('../../helpers/APIError');
const httpStatus = require('http-status');
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: config.razorpayId,
  key_secret: config.razorpaySecret
});

/**
 * Load user and append to req.
 */
async function load(req, res, next, id) {
  try {
    const user = await User.get(id);
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user.safeModel());
}

/**
 * Get user profile of logged in user
 * @returns {User}
 */
async function getProfile(req, res, next) {
  try {
    const user = await User.get(res.locals.session._id);
    return res.json(user.safeModel());
  } catch (error) {
    return next(error);
  }
}

/**
 * Update existing user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.name - The name of user.
 * @returns {User}
 */
async function update(req, res, next) {
  const {user} = req;
  try {
    if (user.email !== req.body.email) {
      const foundUser = await User.findOne({email: req.body.email}).exec();
      if (foundUser) {
        throw new APIError('Email Address is already registered, try with other email address.', httpStatus.CONFLICT);
      }
    }
    ;
    user.email = req.body.email;
    user.name = req.body.name;

    const savedUser = await user.save();
    return res.json(savedUser.safeModel());
  } catch (error) {
    return next(error);
  }
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
async function list(req, res, next) {
  const {limit = 50, skip = 0} = req.query;
  try {
    const users = await User.list({limit, skip});
    return res.json(users);
  } catch (error) {
    return next(error);
  }
}

/**
 * Delete user.
 * @returns {User}
 */
async function remove(req, res, next) {
  const {user} = req;
  try {
    const deletedUser = await user.remove();
    return res.json(deletedUser.safeModel());
  } catch (error) {
    return next(error);
  }
}

async function makePayment(req, res, next) {
  const {amount, customer} = req.body;
  const receipt = otpGenerator.generate(12, {digits: false, upperCase: false, specialChars: false});
  const options = {
    amount: parseInt(amount * 100),
    currency: 'INR',
    receipt,
    payment_capture: 1,
    notes: {customer}
  }
  console.log(options.amount);
  try {
    const response = await razorpay.orders.create(options)
    console.log(response)
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount
    })
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

module.exports = {
  load,
  get,
  getProfile,
  update,
  list,
  remove,
  makePayment
};
