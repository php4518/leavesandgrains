const express = require('express');
const dishCtrl = require('./dish.controller');
const { Joi } = require('express-validation');
const { validate } = require('../../helpers');
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
  destination: (req, file, cb) => { // setting destination of uploading files        
    cb(null, './apipublic');
  },
  filename: (req, file, cb) => { // naming file
    cb(null, file.originalname);
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
      imageMimeType: Joi.array(),
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
      imageMimeType: Joi.array(),
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
  .post(upload.array('images', 5), validate(paramValidation.addDishes), dishCtrl.create);

router.route('/')
  /** GET /api/dishes - Get list of dishes */
  .get(dishCtrl.getAll);

router.route('/:dishId')
  /** GET /api/dishes/:dishId - Get dish */
  .get(dishCtrl.get);

router.route('/:dishId')
  /** PUT /api/dishes/:dishId - Update dish */
  .put(upload.array('images', 5), validate(paramValidation.updateDishes), dishCtrl.update);

router.route('/:dishId')
  /** DELETE /api/dishes/:dishId - Delete dish */
  .delete(dishCtrl.remove);

router.route('/:imgId')
  /** DELETE /api/dishes/:dishId - Delete dish */
  .delete(dishCtrl.deleteImages);

/** Load dish when API with dishId route parameter is hit */
router.param('dishId', dishCtrl.load);
module.exports = router;
