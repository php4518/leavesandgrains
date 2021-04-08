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
 * Get dishes list.
 * @property {number} req.query.skip - Number of dishes to be skipped.
 * @property {number} req.query.limit - Limit number of dishes to be returned.
 * @returns {Dish[]}
 */
async function getAll(req, res, next) {
  const { filters = {} } = req.query;
  try {
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
  remove,
  getAll,
  list,
};
