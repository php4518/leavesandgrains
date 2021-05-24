const express = require('express');
const addressCtrl = require('./address.controller');
const {validate} = require('../../helpers');
const {Joi} = require('express-validation');

const paramValidation = {
  getById: {
    params: Joi.object({
      addressId: Joi.string().required(),
    }),
  },
  getByOwner: {
    params: Joi.object({
      ownerId: Joi.string().required(),
    }),
  },
  add: {
    body: Joi.object({
      owner: Joi.string().required(),
      name: Joi.string().required(),
      addressLine1: Joi.string().required(),
      addressLine2: Joi.string().required(),
      landmark: Joi.string(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      pincode: Joi.number().required(),
    }),
  },
};
const router = express.Router();

router.route('/')
  /** GET /api/address - Get list of addresses */
  .get(addressCtrl.getAll)
  .post(validate(paramValidation.add), addressCtrl.add);

router.route('/:addressId')
  /** GET /api/address/:addressId - Get address */
  .get(validate(paramValidation.getById), addressCtrl.get)
  /** PUT /api/address/:addressId - Update address */
  .put(validate(paramValidation.getById), addressCtrl.update)
  /** DELETE /api/address/:addressId - Delete address */
  .delete(validate(paramValidation.getById), addressCtrl.remove);

router.route('/owner/:ownerId')
  /** GET /api/address/:ownerId - Get address by owner */
  .get(validate(paramValidation.getByOwner), addressCtrl.getByOwner)

/** Load address when API with addressId route parameter is hit */
router.param('addressId', addressCtrl.load);

module.exports = router;
