const Support = require('./support.model');
const config = require('../../config')
const APIError = require('../../helpers/APIError');
const httpStatus = require('http-status');

/**
 * Add Query.
 * @returns {Support[]}
 */
async function addQuery(req, res, next) {
  const support = new Support(req.body);
  try {
    await support.save();
    return res.json('Your Query is submitted successfully, we will reach-out to you as soon as possible.');
  } catch (error) {
    return next(error);
  }
}


module.exports = {
  addQuery
};
