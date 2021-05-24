const express = require('express');
const adminOrderCtrl = require('./admin-order.controllers');
const {validate} = require('../../helpers');
const {Joi} = require('express-validation');

const paramValidation = {
  getOrdersByDate: {
    query: Joi.object({
      date: Joi.date().required(),
      type: Joi.string().required(),
    }),
  },
};

const router = express.Router();

router.route('/get-order-by-date')
  /** GET /api/order - Get list of orders */
  .get(validate(paramValidation.getOrdersByDate), adminOrderCtrl.getOrdersByDate);

module.exports = router;
