const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');

/**
 * Address Schema
 */
const AddressSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: false,
  },
  landmark: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: false,
  },
  lat: {
    type: Number,
    default: 0.00
  },
  lng: {
    type: Number,
    default: 0.00
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * - pre-post-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
AddressSchema.method({});

/**
 * Statics
 */
AddressSchema.statics = {
  /**
   * Get Address
   * @param {ObjectId} id - The objectId of Address.
   * @returns {Promise<Address, APIError>}
   */
  async get(id) {
    const address = await this.findById(id).populate('owner').exec();
    if (!address) {
      throw new APIError('No such Address exists!', httpStatus.NOT_FOUND);
    }
    return address;
  },

  /**
   * List Addresses and populate owner details to wich the Address belongs to.
   * @returns {Promise<Address[]>}
   */
  list() {
    return this.find()
      .populate('owner')
      .exec();
  },

  /**
   * List addresses in descending order of 'createdAt' timestamp.
   * @returns {Promise<Address[]>}
   */
  getAll(filter = {}) {
    return this.find(filter)
      .sort({createdAt: -1})
      .exec();
  },

  /**
   * List Addresses in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Addresses to be skipped.
   * @param {number} limit - Limit number of Addresses to be returned.
   * @returns {Promise<Address[]>}
   */
  listLazy({skip = 0, limit = 50} = {}) {
    return this.find()
      .sort({createdAt: -1})
      .skip(skip)
      .limit(limit)
      .populate('owner')
      .exec();
  },
};

/**
 * @typedef Address
 */
module.exports = mongoose.model('Address', AddressSchema);
