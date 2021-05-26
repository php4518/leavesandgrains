const express = require('express');
const expressJwt = require('express-jwt');
const config = require('./config');
const userRoutes = require('./modules/user/user.routes');
const addressRoutes = require('./modules/address/address.route');
const orderRoutes = require('./modules/order/order.routes');
const adminOrderRoutes = require('./modules/admin-order/admin-order.routes');
const authRoutes = require('./modules/auth/auth.routes');
const dishRoutes = require('./modules/dish/dish.routes');
const mealRoutes = require('./modules/meals/meals.routes');
const supportRoutes = require('./modules/support/support.routes');
const adminRouter = require('./admin');

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// admin panel
router.use('/admin', adminRouter);

// mount auth routes at /auth
router.use('/auth', authRoutes);
router.use('/dishes', dishRoutes);
router.use('/meals', mealRoutes);
router.use('/support', supportRoutes);
router.use('/admin-order', adminOrderRoutes);

// Validating all the APIs with jwt token.
router.use(expressJwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  resultProperty: 'locals.session',
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
}));

// mount user routes at /users
router.use('/users', userRoutes);
router.use('/address', addressRoutes);
router.use('/order', orderRoutes);

module.exports = router;
