const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const httpStatus = require('http-status');
const {ValidationError} = require('express-validation');
const helmet = require('helmet');
const routes = require('./routes');
const config = require('./config');
const APIError = require('./helpers/APIError');

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

if(config.env === 'development') {
  // Admin Panel
  app.use('/admin', require('./admin'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// mount all routes on /api path
app.use('/api', routes);

app.use('/public', express.static('public'));

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    // validation error contains details object which has error message attached to error property.
    const allErrors = err.details.map((pathErrors) => Object.values(pathErrors).join(', '));
    const unifiedErrorMessage = allErrors.join(', ').replace(/, ([^,]*)$/, ' and $1');
    const error = new APIError(unifiedErrorMessage, err.statusCode);
    return next(error);
  }
  if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API Not Found', httpStatus.NOT_FOUND);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({ // eslint-disable-line implicit-arrow-linebreak
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: err.stack,
  }));

module.exports = app;
