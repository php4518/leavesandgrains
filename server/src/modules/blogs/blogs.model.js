const mongoose = require('mongoose');
const httpStatus = require('http-status');
const _ = require('lodash');
const APIError = require('../../helpers/APIError');
const { BLOGS_ENUM } = require('../../utils/constants');

/**
 * Blog Schema
 */
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    longDescription: {
        type: String,
        required: true,
    },
    blogImage: {
        type: Object,
        required: true,
    },
    writerName: {
        type: String,
        required: true,
    },
    contributer: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: Object.keys(BLOGS_ENUM),
        default: BLOGS_ENUM.NUTRITION,
    },
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
BlogSchema.statics = {
    /**
     * Get blog
     * @param {ObjectId} id - The objectId of blog.
     * @returns {Promise<User, APIError>}
     */
    async get(id) {
        const blog = await this.findById(id).exec();
        if (!blog) {
            throw new APIError('No such blog exists!', httpStatus.NOT_FOUND);
        }
        return blog;
    },

    /**
     * List dishes in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of dishes to be skipped.
     * @param {number} limit - Limit number of dishes to be returned.
     * @returns {Promise<Blog[]>}
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
     * @returns {Promise<Blog[]>}
     */
    getAll(filter = {}) {
        return this.find(filter)
            .sort({ createdAt: -1 })
            .exec();
    },
    /**
     * Query dishes
     * @returns {Promise<Blog[]>}
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
 * @typedef Blog
 */
module.exports = mongoose.model('Blog', BlogSchema);
