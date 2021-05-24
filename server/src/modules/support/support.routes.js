const express = require('express');
const {Joi} = require('express-validation');
const supportCtrl = require('./support.controller');
const {validate} = require('../../helpers');

const router = express.Router();

const paramValidation = {
  addQuery: {
    body: Joi.object(({
      email: Joi.string().required(),
      name: Joi.string().required(),
      subject: Joi.string().required(),
      description: Joi.string().required(),
      customer: Joi.string().hex(),
      order: Joi.string().hex(),
    }))
  }
};

router.route('/')
  .post(validate(paramValidation.addQuery), supportCtrl.addQuery)

module.exports = router;
