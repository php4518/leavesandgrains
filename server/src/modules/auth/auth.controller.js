const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const crypto = require('crypto');
const httpStatus = require('http-status');
const User = require('../user/user.model');
const APIError = require('../../helpers/APIError');
const {sendSms} = require('../../helpers/SMS');
const {sendEmail} = require('../../helpers/email');
const config = require('../../config');

/**
 * Returns jwt token and user details if valid email and password are provided
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @returns {token, User}
 */
async function login(req, res, next) {
  try {
    const foundUserWithPhone = await User.findOne({phoneNumber: req.query.phoneNumber}).exec();
    if (!foundUserWithPhone) {
      throw new APIError('This phone number is not registered with us. try create a new acount instead.', httpStatus.NOT_FOUND);
    }
    // const otpHash = createNewOTP(foundUserWithPhone.phoneNumber, foundUserWithPhone.email);
    // console.log("otpHash",otpHash);
    // return res.json({});
    // const token = generateJWT({email: foundUserWithPhone.email});
    return res.json({
      // token,
      user: foundUserWithPhone,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Register a new user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.name - The nme of user.
 * @returns {User}
 */
async function register(req, res, next) {
  const user = new User(req.body);
  try {
    const foundUserWithPhone = await User.findOne({phoneNumber: req.body.phoneNumber}).exec();
    if (foundUserWithPhone) {
      throw new APIError('Given Phone number is already registered, try with other phone number.', httpStatus.CONFLICT);
    }
    const foundUser = await User.findOne({email: req.body.email}).exec();
    if (foundUser) {
      throw new APIError('Email Address is already registered, try with other email address.', httpStatus.CONFLICT);
    }
    user.password = user.generatePassword(req.body.password);
    await user.save();
    const otpHash = createNewOTP(user.phoneNumber, user.email);
    return res.json({otpHash});
    // const token = generateJWT({email: savedUser.email});
    // const emailVerificationLink = generateVerificationLink(token);
    // return res.json({
    //   emailVerificationLink,
    //   token,
    //   user: savedUser.safeModel(),
    // });
  } catch (error) {
    return next(error);
  }
}


/**
 * Verify a new user with otp
 * @property {string} req.query.otp - otp for user.
 * @property {string} req.query.phone - phone number for user.
 * @returns {String} detail message
 */
async function verifyOTP(req, res, next) {
  try {
    let {phoneNumber, otp, otpHash} = req.body;
    const foundUserWithPhone = await User.findOne({phoneNumber}).exec();
    if (!foundUserWithPhone) {
      throw new APIError('This phone number is not registered with us. try create a new acount instead.', httpStatus.NOT_FOUND);
    }
    // const verify = verifyOTPHash(phoneNumber, otpHash, otp);
    // if (verify.success) {
      const token = generateJWT(foundUserWithPhone.safeModel());
      return res.json({
        token,
        user: foundUserWithPhone.safeModel(),
      });
    // }
    // throw new APIError(verify.message || 'error verifying otp, try resend again', httpStatus.UNAUTHORIZED);
  } catch (error) {
    return next(error);
  }
}

/**
 * Verify a new user email
 * @property {string} req.query.token - token for user.
 * @returns {String} detail message
 */
async function verifyEmailToken(req, res, next) {
  let token = req.query.token;
  return jwt.verify(token, config.jwtSecret, async (err, decoded) => {
    try {
      if (err || !decoded) {
        throw new APIError('Invalid Verification Link', httpStatus.UNAUTHORIZED);
      }
      const user = await User.getByEmail(decoded.email);
      if (!user) {
        throw new APIError('Invalid Verification Link', httpStatus.UNAUTHORIZED);
      }
      if (user.emailVerified) {
        return res.json({
          message: 'Email already verified',
        });
      }
      user.emailVerified = true;
      await user.save();

      return res.json({
        message: 'Your email is verified successfully',
      });
    } catch (e) {
      return res.status(httpStatus.BAD_REQUEST).send({message: e.message});
    }
  });
}

/**
 * Resend verification email
 * @property {string} req.query.email - The email of user.
 * @returns {message}
 */

async function resendEmailToken(req, res, next) {
  try {
    const foundUser = await User.getByEmail(req.query.email);
    if (!foundUser) {
      throw new APIError('User not found', httpStatus.UNAUTHORIZED);
    }
    if (foundUser.emailVerified) {
      return res.json({
        message: 'Email already verified',
      });
    }
    const token = generateJWT({email: foundUser.email});
    const emailVerificationLink = generateVerificationLink(token);

    return res.json({
      message: 'Email has been sent to your email address: ' + foundUser.email,
      emailVerificationLink
    });
  } catch (error) {
    return next(error);
  }
}

function createNewOTP(phone, email) {
  // Generate a 6 digit numeric OTP
  const otp = otpGenerator.generate(6, {alphabets: false, upperCase: false, specialChars: false});
  const ttl = 2 * 60 * 1000; // 2 Minutes in miliseconds
  const expires = Date.now() + ttl; //timestamp to 5 minutes in the future
  const data = `${phone}.${otp}.${expires}`; // phone.otp.expiry_timestamp
  const hash = crypto.createHmac("sha256", config.otpSecret).update(data).digest("hex"); // creating SHA256 hash of the data
  const otpHash = `${hash}.${expires}`; // Hash.expires, format to send to the user
  // you have to implement the function to send SMS yourself. For demo purpose. let's assume it's called sendSMS
  const text = `Your OTP is ${otp}. it will expire in 2 minutes`;
  sendSms(phone, text);
  sendEmail({ subject: 'Verification code', text, to: email });
  return otpHash;
}

function verifyOTPHash(phone, hash, otp) {
  // Seperate Hash value and expires from the hash returned from the user
  let [hashValue, expires] = hash.split(".");
  // Check if expiry time has passed
  let now = Date.now();
  if (now > parseInt(expires)) return ({
    success: false,
    message: 'OTP has been expired, try again'
  });
  // Calculate new hash with the same key and the same algorithm
  let data = `${phone}.${otp}.${expires}`;
  let newCalculatedHash = crypto.createHmac("sha256", config.otpSecret).update(data).digest("hex");
  // Match the hashes
  if (newCalculatedHash === hashValue) {
    return ({success: true});
  }
  return ({
    success: false,
    message: 'invalid OTP'
  });
}

/**
 * Generates JWT for the payload
 * @param {*} payload - Payload to be signed in JWT
 */
function generateJWT(payload) {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
    algorithm: 'HS256',
  });
}

/**
 * Generates verification link for the user verification
 * @param {*} token - token for user to be verified
 */
function generateVerificationLink(token) {
  return `${config.publicAppUrl}sign-in/verifyEmail?token=${token}`;
}

module.exports = {login, register, verifyEmailToken, resendEmailToken, verifyOTP};
