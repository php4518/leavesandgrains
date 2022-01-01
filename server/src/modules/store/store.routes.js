const express = require('express');
const storeCtrl = require('./store.controller');
const { Joi } = require('express-validation');
const { validate } = require('../../helpers');
const router = express.Router();

const paramValidation = {
    addStore: {
        body: Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            lat: Joi.number().required(),
            lng: Joi.number().required()
        }),
    },
    updateStore: {
        params: Joi.object({
            id: Joi.string().required(),
        }),
        body: Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            lat: Joi.number().required(),
            lng: Joi.number().required()
        }),
    }
}

router.route('/')
    .post(validate(paramValidation.addStore), storeCtrl.create);

router.route('/')
    /** GET /api/store - Get list of store */
    .get(storeCtrl.getAll);

router.route('/:id')
    /** GET /api/store/:id - Get store */
    .get(storeCtrl.get);

router.route('/:id')
    /** PUT /api/store/:id - Update store */
    .put(validate(paramValidation.updateStore), storeCtrl.update);

router.route('/:id')
    /** DELETE /api/store/:id - Delete store */
    .delete(storeCtrl.remove);

/** Load store when API with id route parameter is hit */
router.param('id', storeCtrl.load);
module.exports = router;
