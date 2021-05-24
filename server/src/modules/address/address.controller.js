const Address = require('./address.model');

/**
 * Load Address and append to req.
 */
async function load(req, res, next, id) {
  try {
    req.address = await Address.get(id);
    return next();
  } catch (error) {
    return next(error);
  }
}

/**
 * Get Address
 * @returns {Address}
 */
function get(req, res) {
  return res.json(req.address);
}

/**
 * Get Address By Owner
 * @returns {Address}
 */
async function getByOwner(req, res) {
  let {ownerId: owner} = req.params;
  try {
    const addresses = await Address.getAll({isActive: true, owner});
    return res.json(addresses);
  } catch (error) {
    return next(error);
  }
}

/**
 * Get Address list.
 * @property {number} req.query.skip - Number of addresses to be skipped.
 * @property {number} req.query.limit - Limit number of addresses to be returned.
 * @returns {Address[]}
 */
async function getAll(req, res, next) {
  let {filters = {}} = req.query;
  try {
    filters = {isActive: true, ...filters};
    const addresses = await Address.getAll(filters);
    return res.json(addresses);
  } catch (error) {
    return next(error);
  }
}

/**
 * Add Address.
 * @returns {Address[]}
 */
async function add(req, res, next) {
  const address = new Address(req.body);
  try {
    await address.save();
    return res.json(address);
  } catch (error) {
    return next(error);
  }
}

/**
 * Update Address.
 * @returns {Address[]}
 */
async function update(req, res, next) {
  try {
    const updated = await Address.findOneAndUpdate({_id: req.body._id}, {$set: req.body}, {returnOriginal: false});
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
}

/**
 * Delete address.
 * @returns {Address}
 */
async function remove(req, res, next) {
  const {address} = req;
  try {
    const deletedAddress = await address.remove();
    return res.json(deletedAddress);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  load,
  add,
  get,
  update,
  remove,
  getAll,
  getByOwner,
};
