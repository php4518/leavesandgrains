const Store = require('./store.model');
const APIError = require('../../helpers/APIError');
const httpStatus = require('http-status');

/**
 * Load store and append to req.
 */
async function load(req, res, next, id) {
  try {
    req.store = await Store.get(id);
    return next();
  } catch (error) {
    return next(error);
  }
}

/**
 * Get store
 * @returns {Store}
 */
function get(req, res) {
  return res.json(req.store);
}

/**
 * Create new store
 * @property {string} req.body.name - The name of store.
 * @property {string} req.body.address - Author name of store.
 * @property {string} req.body.lat- The is lat of store.
 * @property {string} req.body.lng- The is lng of store.
 * @returns {Store}
 */
async function create(req, res, next) {
  const store = new Store({
    name: req.body.name,
    address: req.body.address,
    lat: req.body.lat,
    lng: req.body.lng
  })

  try {
    const foundStore = await Store.findOne({ lat: store.lat, lng: store.lng, address: store.address }).exec();
    if (foundStore) {
      throw new APIError('Store location must be unique', httpStatus.CONFLICT, true);
    }
    await store.save();
    return res.json(store);
  } catch (error) {
    return next(error);
  }
}

/**
 * Update existing store
 * @property {string} req.body.name - The name of store.
 * @property {string} req.body.address - Author name of store.
 * @property {string} req.body.lat- The is lat of store.
 * @property {string} req.body.lng- The is lng of store.
 * @returns {Store}
 */
async function update(req, res, next) {

  const store = {
    name: req.body.name,
    address: req.body.address,
    lat: req.body.lat,
    lng: req.body.lng
  }

  try {
    const updated = await Store.findOneAndUpdate({ _id: req.params.id }, { $set: store }, { returnOriginal: false });
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
}

/**
 * Get store list.
 * @property {number} req.query.skip - Number of store to be skipped.
 * @property {number} req.query.limit - Limit number of store to be returned.
 * @returns {Store[]}
 */
async function getAll(req, res, next) {
  let { filters = {} } = req.query;
  try {
    filters = { ...filters };
    const store = await Store.getAll(filters);
    return res.json(store);
  } catch (error) {
    return next(error);
  }
}

async function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  try {
    const store = await Store.list({ limit, skip });
    return res.json(store);
  } catch (error) {
    return next(error);
  }
}

/**
 * Delete store.
 * @returns {Store}
 */

async function remove(req, res, next) {
  try {

    Store.findOneAndRemove({ _id: req.params.id })
      .then(user => {
        if (!user) {
          return res.json({
            status: false,
            statuscode: 404,
            message: 'Store not found with id ' + req.params.id,
          })
        }
        res.status(200).json({
          status: true,
          statuscode: 200,
          message: 'Store deleted successfully!',
        })
      }).catch(err => {
        return res.json({
          status: false,
          statuscode: 404,
          message: "Store not found with id " + req.params.id
        });
      });
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
