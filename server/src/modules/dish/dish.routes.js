const express = require('express');
const dishCtrl = require('./dish.controller');
const { Joi } = require('express-validation');
const { validate } = require('../../helpers');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true)
  }
  else {
    cb("select image only.", false)
  }
}

var docStorage = multer.diskStorage({
  destination: "./uploadedDocuments/dishImg/",
  filename: function (req, file, callback) {
    callback(null, file.originalname + '_' + Date.now() + path.extname(file.originalname))
  }
});

var upload = multer({
  storage: docStorage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const paramValidation = {
  addDishes: {
    body: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      images: Joi.string().required(),
      imageMimeType: Joi.string(),
      servingWeight: Joi.number(),
      price: Joi.number().required(),
      category: Joi.string(),
      proteinType: Joi.string().required(),
      instructions: Joi.string().required(),
      ingredients: Joi.string().required(),
      contains: Joi.string().required(),
      ingredientInstructions: Joi.string().required(),
      calories: Joi.number().required(),
      protein: Joi.number().required(),
      carbs: Joi.number().required(),
      fats: Joi.number().required(),
      nutritions: Joi.string(),
      isActive: Joi.boolean()
    }),
  },
  updateDishes: {
    params: Joi.object({
      dishId: Joi.string().required(),
    }),
    body: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      images: Joi.string().required(),
      imageMimeType: Joi.string(),
      servingWeight: Joi.number(),
      price: Joi.number().required(),
      category: Joi.string(),
      proteinType: Joi.string().required(),
      instructions: Joi.string().required(),
      ingredients: Joi.string().required(),
      contains: Joi.string().required(),
      ingredientInstructions: Joi.string().required(),
      calories: Joi.number().required(),
      protein: Joi.number().required(),
      carbs: Joi.number().required(),
      fats: Joi.number().required(),
      nutritions: Joi.string(),
      isActive: Joi.boolean()
    }),
  }
}

router.route('/')
  /** GET /api/dishes - Get list of dishes */
  .get(dishCtrl.getAll)

  .post(validate(paramValidation.addDishes), dishCtrl.create, upload.single('images'));

router.route('/:dishId')
  /** GET /api/dishes/:dishId - Get dish */
  .get(dishCtrl.get)

  /** PUT /api/dishes/:dishId - Update dish */
  .put(validate(paramValidation.updateDishes), dishCtrl.update);




/** DELETE /api/dishes/:dishId - Delete dish */
// .delete(dishCtrl.remove);

/** Load dish when API with dishId route parameter is hit */
router.param('dishId', dishCtrl.load);

module.exports = router;
