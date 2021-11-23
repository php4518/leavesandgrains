const express = require('express');
const {Joi} = require('express-validation');
const authCtrl = require('./auth.controller');
const {validate} = require('../../helpers');

const router = express.Router();

const paramValidation = {
  login: {
    query: Joi.object({
      phoneNumber: Joi.string().required(),
    }),
  },
  registerUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      name: Joi.string().required(),
    }),
  },
  verifyEmail: {
    query: Joi.object({
      token: Joi.string().required(),
    }),
  },
  resendVerificationEmail: {
    query: Joi.object({
      email: Joi.string().email().required(),
    }),
  },
  verifyOTP: {
    body: Joi.object({
      phoneNumber: Joi.string().required(),
      otp: Joi.string().required(),
      // otpHash: Joi.string().required(),
    }),
  }
};

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .get(validate(paramValidation.login), authCtrl.login);

/** POST /api/auth/register - Register a new user */
router.route('/register')
  .post(validate(paramValidation.registerUser), authCtrl.register);

/** GET /api/auth/verifyOTP - Verify a new user with otp */
router.route('/verifyOtp')
  .post(validate(paramValidation.verifyOTP), authCtrl.verifyOTP);

/** GET /api/auth/verifyEmail - Verify a new user email */
router.route('/verifyEmail')
  .get(validate(paramValidation.verifyEmail), authCtrl.verifyEmailToken);

/** GET /api/auth/resend-verification-email - Verify a new user email */
router.route('/resend-verification-email')
  .get(validate(paramValidation.resendVerificationEmail), authCtrl.resendEmailToken);

module.exports = router;
