const Blog = require('./blogs.model');
const APIError = require('../../helpers/APIError');
const httpStatus = require('http-status');
let fs = require('fs');

/**
 * Load blog and append to req.
 */
async function load(req, res, next, id) {
  try {
    req.blog = await Blog.get(id);
    return next();
  } catch (error) {
    return next(error);
  }
}

/**
 * Get blog
 * @returns {Blog}
 */
function get(req, res) {
  return res.json(req.blog);
}

/**
 * Create new blog
 * @property {string} req.body.title - The name of blog.
 * @property {string} req.body.description - Author name of blog.
 * @property {string} req.body.blogimage- The is image of blog.
 * @property {string} req.body.imageMimeType- The is extension of blog image.
 * @property {string} req.body.servingWeight- The serving weight of blog.
 * @property {string} req.body.price- The price of blog.
 * @property {string} req.body.category- The category of blog.
 * @property {string} req.body.proteinType- The proteinType of blog.
 * @property {string} req.body.instructions- The instructions of blog.
 * @property {string} req.body.ingredients- The ingredients of blog.
 * @property {string} req.body.contains- The contains of blog.
 * @property {string} req.body.ingredientInstructions- The ingredient Instructions of blog.
 * @property {string} req.body.calories- The calories of blog.
 * @property {string} req.body.protein- The protein of blog.
 * @property {string} req.body.carbs- The carbs of blog.
 * @property {string} req.body.fats- The fats of blog.
 * @property {string} req.body.nutritions- The nutritions of blog.
 * @property {string} req.body.isActive- The Active of blog.
 * @returns {Blog}
 */
 async function create(req, res, next) {
  // const blog = new Blog(req.body);

  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    longdescription: req.body.longdescription,
    blogimage: req.file,
    writerName: req.body.writerName,
    category: req.body.category,
    contributer: req.body.contributer,
    isActive: req.body.isActive,
  })

  try {
    const foundBlog = await Blog.findOne({ title: blog.title, category: blog.category }).exec();
    if (foundBlog) {
      throw new APIError('Blog name must be unique', httpStatus.CONFLICT, true);
    }
    await blog.save();
    return res.json(blog);
  } catch (error) {
    return next(error);
  }
}

/**
 * Update existing blog
* @property {string} req.body.title - The name of blog.
 * @property {string} req.body.description - Author name of blog.
 * @property {string} req.body.blogimage- The isbn of blog.
 * @property {string} req.body.servingWeight- The serving weight of blog.
 * @property {string} req.body.price- The price of blog.
 * @property {string} req.body.category- The category of blog.
 * @property {string} req.body.proteinType- The proteinType of blog.
 * @property {string} req.body.instructions- The instructions of blog.
 * @property {string} req.body.ingredients- The ingredients of blog.
 * @property {string} req.body.contains- The contains of blog.
 * @property {string} req.body.ingredientInstructions- The ingredient Instructions of blog.
 * @property {string} req.body.calories- The calories of blog.
 * @property {string} req.body.protein- The protein of blog.
 * @property {string} req.body.carbs- The carbs of blog.
 * @property {string} req.body.fats- The fats of blog.
 * @property {string} req.body.nutritions- The nutritions of blog.
 * @property {string} req.body.isActive- The Active of blog.
 * @returns {Blog}
 */
async function update(req, res, next) {

  const blog = {
    title: req.body.title,
    description: req.body.description,
    longdescription: req.body.longdescription,
    blogimage: req.file,
    writerName: req.body.writerName,
    category: req.body.category,
    contributer: req.body.contributer,
    isActive: req.body.isActive || true,
  }

  try {
    const updated = await Blog.findOneAndUpdate({ _id: req.params.id }, { $set: blog }, { returnOriginal: false });
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
}

async function deleteImages(req, res, next) {
  try {
    const imgId = req.params.imgId;
    await Blog.findById(req.params.id)
      .select('blogimage')
      .exec()
      .then(docs => {
        fs.unlinkSync("./" + docs.blogimage[imgId]);
        // result.deleteOne({ _id: id }).exec();
        res.status(200).json({
          status: true,
          statuscode: 200,
          message: 'Blog image delete successfully!',
        })
      })
    return;
  } catch (err) {
    next(err);
  }
}

/**
 * Get bloges list.
 * @property {number} req.query.skip - Number of bloges to be skipped.
 * @property {number} req.query.limit - Limit number of bloges to be returned.
 * @returns {Blog[]}
 */
async function getAll(req, res, next) {
  let { filters = {} } = req.query;
  try {
    filters = { isActive: true, ...filters };
    const bloges = await Blog.getAll(filters);
    return res.json(bloges);
  } catch (error) {
    return next(error);
  }
}

async function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  try {
    const bloges = await Blog.list({ limit, skip });
    return res.json(bloges);
  } catch (error) {
    return next(error);
  }
}

/**
 * Delete blog.
 * @returns {Blog}
 */
// async function remove(req, res, next) {
//   const { blog } = req;
//   try {
//     const deletedBlog = await blog.remove();
//     return res.json(deletedBlog);
//   } catch (error) {
//     return next(error);
//   }
// }

async function remove(req, res, next) {
  try {
    Blog.findById(req.params.id)
      .select('blogimage')
      .exec()
      .then((docs) => {
        docs.blogimage.map(async (index, val) => {
          fs.unlinkSync("./" + docs.blogimage[val]);
        });
      })

    Blog.findOneAndRemove({ _id: req.params.id })
      .then(user => {
        if (!user) {
          return res.json({
            status: false,
            statuscode: 404,
            message: 'Blog not found with id ' + req.params.id,
          })
        }
        res.status(200).json({
          status: true,
          statuscode: 200,
          message: 'Blog deleted successfully!',
        })
      }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.json({
            status: false,
            statuscode: 404,
            message: "Blog not found with id " + req.params.id
          });
        }
        return res.json({
          status: false,
          statuscode: 505,
          message: "Could not delete user with id " + req.params.id
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
  deleteImages,
  getAll,
  list,
};
