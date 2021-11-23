const Dish = require('./dish.model');

/**
 * Load dish and append to req.
 */
async function load(req, res, next, id) {
  try {
    req.dish = await Dish.get(id);
    return next();
  } catch (error) {
    return next(error);
  }
}

/**
 * Get dish
 * @returns {Dish}
 */
function get(req, res) {
  return res.json(req.dish);
}

/**
 * Create new dish
 * @property {string} req.body.title - The name of dish.
 * @property {string} req.body.description - Author name of dish.
 * @property {string} req.body.images- The isbn of dish.
 * @property {string} req.body.servingWeight- The serving weight of dish.
 * @property {string} req.body.price- The price of dish.
 * @property {string} req.body.category- The category of dish.
 * @property {string} req.body.proteinType- The proteinType of dish.
 * @property {string} req.body.instructions- The instructions of dish.
 * @property {string} req.body.ingredients- The ingredients of dish.
 * @property {string} req.body.contains- The contains of dish.
 * @property {string} req.body.ingredientInstructions- The ingredient Instructions of dish.
 * @property {string} req.body.calories- The calories of dish.
 * @property {string} req.body.protein- The protein of dish.
 * @property {string} req.body.carbs- The carbs of dish.
 * @property {string} req.body.fats- The fats of dish.
 * @property {string} req.body.nutritions- The nutritions of dish.
 * @property {string} req.body.isActive- The Active of dish.
 * @returns {Dish}
 */
async function create(req, res, next) {
  const dish = new Dish(req.body);
  const dishimg = req.files;
console.log("dishimg",dishimg);
  try {
    const foundDish = await Dish.findOne({ title: dish.title, category: dish.category }).exec();
    if (foundDish) {
      throw new APIError('Dish name must be unique', httpStatus.CONFLICT, true);
    }
    const savedDish = await dish.save();
    return res.json(savedDish);
  } catch (error) {
    return next(error);
  }
}

/**
 * Update existing dish
* @property {string} req.body.title - The name of dish.
 * @property {string} req.body.description - Author name of dish.
 * @property {string} req.body.images- The isbn of dish.
 * @property {string} req.body.servingWeight- The serving weight of dish.
 * @property {string} req.body.price- The price of dish.
 * @property {string} req.body.category- The category of dish.
 * @property {string} req.body.proteinType- The proteinType of dish.
 * @property {string} req.body.instructions- The instructions of dish.
 * @property {string} req.body.ingredients- The ingredients of dish.
 * @property {string} req.body.contains- The contains of dish.
 * @property {string} req.body.ingredientInstructions- The ingredient Instructions of dish.
 * @property {string} req.body.calories- The calories of dish.
 * @property {string} req.body.protein- The protein of dish.
 * @property {string} req.body.carbs- The carbs of dish.
 * @property {string} req.body.fats- The fats of dish.
 * @property {string} req.body.nutritions- The nutritions of dish.
 * @property {string} req.body.isActive- The Active of dish.
 * @returns {Dish}
 */
 async function update(req, res, next) {
  try {
    const updated = await Dish.findOneAndUpdate({_id: req.params.dishId}, {$set: req.body}, {returnOriginal: false});
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
}

/**
 * Get dishes list.
 * @property {number} req.query.skip - Number of dishes to be skipped.
 * @property {number} req.query.limit - Limit number of dishes to be returned.
 * @returns {Dish[]}
 */
async function getAll(req, res, next) {
  let { filters = {} } = req.query;
  try {
    filters = { isActive: true, ...filters };
    const dishes = await Dish.getAll(filters);
    return res.json(dishes);
  } catch (error) {
    return next(error);
  }
}

async function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  try {
    const dishes = await Dish.list({ limit, skip });
    return res.json(dishes);
  } catch (error) {
    return next(error);
  }
}

/**
 * Delete dish.
 * @returns {Dish}
 */
async function remove(req, res, next) {
  const { dish } = req;
  try {
    const deletedDish = await dish.remove();
    return res.json(deletedDish);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  load,
  get,
  create,
  update,
  remove,
  getAll,
  list,
};
