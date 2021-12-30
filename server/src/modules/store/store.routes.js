const express = require('express');
const blogCtrl = require('./blogs.controller');
const { Joi } = require('express-validation');
const { validate } = require('../../helpers');
const router = express.Router();

const paramValidation = {
    addBlog: {
        body: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            longDescription: Joi.string().required(),
            blogImage: Joi.object(),
            writerName: Joi.string().required(),
            category: Joi.string().required(),
            contributer: Joi.string().required(),
            isActive: Joi.boolean()
        }),
    },
    updateBlog: {
        params: Joi.object({
            id: Joi.string().required(),
        }),
        body: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            longDescription: Joi.string().required(),
            writerName: Joi.string().required(),
            category: Joi.string().required(),
            contributer: Joi.string().required(),
            isActive: Joi.boolean()
        }),
    }
}

router.route('/')
    .post(validate(paramValidation.addBlog), blogCtrl.create);

router.route('/')
    /** GET /api/bloges - Get list of bloges */
    .get(blogCtrl.getAll);

router.route('/:id')
    /** GET /api/bloges/:id - Get blog */
    .get(blogCtrl.get);

router.route('/:id')
    /** PUT /api/bloges/:id - Update blog */
    .put(validate(paramValidation.updateBlog), blogCtrl.update);

router.route('/:id')
    /** DELETE /api/bloges/:id - Delete blog */
    .delete(blogCtrl.remove);

/** Load blog when API with id route parameter is hit */
router.param('id', blogCtrl.load);
module.exports = router;
