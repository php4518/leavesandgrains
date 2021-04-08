const express = require('express');
const dishCtrl = require('./dish.controller');

const router = express.Router();

router.route('/')
  /** GET /api/dishes - Get list of dishes */
  .get(dishCtrl.getAll);

router.route('/:bookId')
  /** GET /api/dishes/:dishId - Get dish */
  .get(dishCtrl.get)

  /** PUT /api/dishes/:dishId - Update dish */
  // .put(validate(paramValidation.updateBook), dishCtrl.update)

  /** DELETE /api/dishes/:dishId - Delete dish */
  .delete(dishCtrl.remove);

/** Load dish when API with dishId route parameter is hit */
router.param('dishId', dishCtrl.load);

module.exports = router;
