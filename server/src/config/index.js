const path = require('path');
const {Joi} = require('express-validation');
const dotenv = require('dotenv');

const nodeEnvValidator = Joi.string()
  .allow('development', 'production', 'test', 'provision')
  .default('development');

const nodeEnvSchema = Joi.object({
  NODE_ENV: nodeEnvValidator,
}).unknown().required();

// getting environment to load relative .env file
const {error: envError, value} = nodeEnvSchema.validate(process.env);
if (envError) {
  throw new Error(`Environment validation error: ${envError.message}`);
}

// require and configure dotenv, will load vars in .env.* file in PROCESS.ENV
const envFilePath = path.resolve(__dirname, '..', '..', `.env.${value.NODE_ENV}`);
const envConfig = dotenv.config({path: envFilePath});
if (envConfig.error) {
  throw new Error(`Environment file config error: ${envConfig.error}`);
}

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: nodeEnvValidator,
  PORT: Joi.number().default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false),
    }),
  JWT_SECRET: Joi.string().required().description('JWT Secret required to sign'),
  OTP_SECRET: Joi.string().required().description('JWT Secret required to sign'),
  JWT_EXPIRES_IN: Joi.string().default('1d').description('JWT expiration time in seconds'),
  MONGO_HOST: Joi.string().required().description('Mongo DB host url'),
  ADMIN_EMAIL: Joi.string().default('admin@leavesandgrains.com'),
  ADMIN_PASSWORD: Joi.string().required().description('admin password required'),
  COOKIE_PASSWORD: Joi.string().default('COOKIE_PASSWORD'),
  MONGO_PORT: Joi.number().default(27017),
  API_URL: Joi.string().default('http://localhost:4040/api'),
  RAZORPAY_ID: Joi.string().default(''),
  RAZORPAY_SECRET: Joi.string().default(''),
  SMS_USERNAME: Joi.string().default(''),
  SMS_PASSWORD: Joi.string().default(''),
  SMS_SENDER_ID: Joi.string().default(''),
  EMAIL_SERVICE_USER: Joi.string().required(),
  EMAIL_SERVICE_PASS: Joi.string().required(),
  EMAIL_SERVICE_SENDER_EMAIL: Joi.string().default('team@leavesandgrains.com'),
}).unknown()
  .required();

const {error, value: envVars} = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const url = (env) => {
  switch (env) {
    case 'development':
      return 'http://localhost:3000/'
    case 'test':
      return 'http://localhost:3000/'
    case 'production':
      return 'http://localhost:3000/'
  }
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  publicAppUrl: url(envVars.NODE_ENV),
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  otpSecret: envVars.OTP_SECRET,
  jwtExpiresIn: envVars.JWT_EXPIRES_IN,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
  },
  adminEmail: envVars.ADMIN_EMAIL,
  adminPassword: envVars.ADMIN_PASSWORD,
  cookiePassword: envVars.COOKIE_PASSWORD,
  apiUrl: envVars.API_URL,
  razorpayId: envVars.RAZORPAY_ID,
  razorpaySecret: envVars.RAZORPAY_SECRET,
  smsUserName: envVars.SMS_USERNAME,
  smsPassword: envVars.SMS_PASSWORD,
  smsSenderId: envVars.SMS_SENDER_ID,
  emailServiceUser: envVars.EMAIL_SERVICE_USER,
  emailServicePass: envVars.EMAIL_SERVICE_PASS,
  emailService: 'Gmail',
  emailServiceSender: `${envVars.EMAIL_SERVICE_SENDER_EMAIL}`
};

module.exports = config;
