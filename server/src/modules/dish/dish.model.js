const mongoose = require('mongoose');
const httpStatus = require('http-status');
const _ = require('lodash');
const APIError = require('../../helpers/APIError');
const {MEALS_ENUM} = require('../../utils/constants');

/**
 * Dish Schema
 */
const DishSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  imageMimeType: {
    type: Array,
  },
  servingWeight: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: Object.keys(MEALS_ENUM),
    default: MEALS_ENUM.MEALS,
  },
  proteinType: {
    type: String,
    enum: ['LAMB', 'VEGAN', 'VEGETARIAN'],
    default: 'VEGETARIAN',
  },
  instructions: {
    type: String,
    required: false,
  },
  ingredients: {
    type: String,
    required: false,
  },
  contains: {
    type: String,
    required: false,
  },
  ingredientInstructions: {
    type: String,
    required: false,
  },
  calories: {
    type: Number,
    required: false,
    default: 0
  },
  protein: {
    type: Number,
    required: false,
    default: 0
  },
  carbs: {
    type: Number,
    required: false,
    default: 0
  },
  fats: {
    type: Number,
    required: false,
    default: 0
  },
  nutritions: [{name: String, perServing: Number}],
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Statics
 */
DishSchema.statics = {
  /**
   * Get dish
   * @param {ObjectId} id - The objectId of dish.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    const dish = await this.findById(id).exec();
    if (!dish) {
      throw new APIError('No such dish exists!', httpStatus.NOT_FOUND);
    }
    return dish;
  },

  /**
   * List dishes in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of dishes to be skipped.
   * @param {number} limit - Limit number of dishes to be returned.
   * @returns {Promise<Dish[]>}
   */
  list({skip = 0, limit = 50} = {}) {
    return this.find()
      .sort({createdAt: -1})
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
  /**
   * List dishes in descending order of 'createdAt' timestamp.
   * @returns {Promise<Dish[]>}
   */
  getAll(filter = {}) {
    return this.find(filter)
      .sort({createdAt: -1})
      .exec();
  },
  /**
   * Query dishes
   * @returns {Promise<Dish[]>}
   */
  async fetch(query = [], limit = 1) {
    // let totalDocs = await this.countDocuments(query);
    // let r = Math.floor(Math.random() * totalDocs);
    // return this.find(query).limit(limit).skip(r);
    return this.aggregate(query)
      .sort({createdAt: -1})
      .exec();
  },
};

/**
 * @typedef Dish
 */
module.exports = mongoose.model('Dish', DishSchema);
