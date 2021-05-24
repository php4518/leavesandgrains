const express = require('express');
const orderCtrl = require('./order.controllers');
const {validate} = require('../../helpers');
const {Joi} = require('express-validation');

const paramValidation = {
  getAll: {
    params: Joi.object({
      userId: Joi.string().hex().required(),
    }),
  },
  add: {
    body: Joi.object({
      individualMeals: Joi.array(),
      mealPlans: Joi.array(),
      address: Joi.string().hex().required(),
      customer: Joi.string().hex().required(),
      totalAmount: Joi.number().required(),
      paymentDetails: Joi.any()
    }),
  },
};
const router = express.Router();

router.route('/:userId')
  /** GET /api/order - Get list of orders */
  .get(validate(paramValidation.getAll), orderCtrl.getAll)
  .post(validate(paramValidation.add), orderCtrl.add);
//
// router.route('/:addressId')
//   /** GET /api/address/:addressId - Get address */
//   .get(validate(paramValidation.getById), addressCtrl.get)
//   /** PUT /api/address/:addressId - Update address */
//   .put(validate(paramValidation.getById), addressCtrl.update)
//   /** DELETE /api/address/:addressId - Delete address */
//   .delete(validate(paramValidation.getById), addressCtrl.remove);
//
// router.route('/owner/:ownerId')
//   /** GET /api/address/:ownerId - Get address by owner */
//   .get(validate(paramValidation.getByOwner), addressCtrl.getByOwner)
//
// /** Load address when API with addressId route parameter is hit */
// router.param('addressId', addressCtrl.load);

module.exports = router;
