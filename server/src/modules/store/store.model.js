const mongoose = require('mongoose');
const httpStatus = require('http-status');
const _ = require('lodash');
const APIError = require('../../helpers/APIError');
const { BLOGS_ENUM } = require('../../utils/constants');

/**
 * Store Schema
 */
const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
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
StoreSchema.statics = {
    /**
     * Get store
     * @param {ObjectId} id - The objectId of store.
     * @returns {Promise<User, APIError>}
     */
    async get(id) {
        const store = await this.findById(id).exec();
        if (!store) {
            throw new APIError('No such store exists!', httpStatus.NOT_FOUND);
        }
        return store;
    },

    /**
     * List dishes in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of dishes to be skipped.
     * @param {number} limit - Limit number of dishes to be returned.
     * @returns {Promise<Store[]>}
     */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    },
    /**
     * List dishes in descending order of 'createdAt' timestamp.
     * @returns {Promise<Store[]>}
     */
    getAll(filter = {}) {
        return this.find(filter)
            .sort({ createdAt: -1 })
            .exec();
    },
    /**
     * Query dishes
     * @returns {Promise<Store[]>}
     */
    async fetch(query = [], limit = 1) {
        // let totalDocs = await this.countDocuments(query);
        // let r = Math.floor(Math.random() * totalDocs);
        // return this.find(query).limit(limit).skip(r);
        return this.aggregate(query)
            .sort({ createdAt: -1 })
            .exec();
    },
};

/**
 * @typedef Store
 */
module.exports = mongoose.model('Store', StoreSchema);
