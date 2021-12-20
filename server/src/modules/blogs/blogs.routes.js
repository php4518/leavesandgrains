const express = require('express');
const blogCtrl = require('./blogs.controller');
const { Joi } = require('express-validation');
const { validate } = require('../../helpers');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb("select image only.", false)
    }
}

var docStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './apipublic/blog');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '_' + Date.now() + path.extname(file.originalname))
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
    addBlog: {
        body: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            longdescription: Joi.string().required(),
            blogimage: Joi.object(),
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
            longdescription: Joi.string().required(),
            writerName: Joi.string().required(),
            category: Joi.string().required(),
            contributer: Joi.string().required(),
            isActive: Joi.boolean()
        }),
    }
}

router.route('/')
    .post(upload.single('blogimage'), validate(paramValidation.addBlog), blogCtrl.create);

router.route('/')
    /** GET /api/bloges - Get list of bloges */
    .get(blogCtrl.getAll);

router.route('/:id')
    /** GET /api/bloges/:id - Get blog */
    .get(blogCtrl.get);

router.route('/:id')
    /** PUT /api/bloges/:id - Update blog */
    .put(upload.single('blogimage'), validate(paramValidation.updateBlog), blogCtrl.update);

router.route('/:id')
    /** DELETE /api/bloges/:id - Delete blog */
    .delete(blogCtrl.remove);

/** Load blog when API with id route parameter is hit */
router.param('id', blogCtrl.load);
module.exports = router;
