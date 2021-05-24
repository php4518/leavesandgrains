const express = require('express');
const mealCtrl = require('./meals.controller');

const router = express.Router();

router.route('/get-all')
  .get(mealCtrl.getMealData);

module.exports = router;
