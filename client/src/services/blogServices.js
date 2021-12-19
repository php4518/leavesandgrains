import axios from './index';

const getAllBlogs = (params) => axios({ url: '/blogs', params });
const postBlogs = (params) => axios.post('/blogs', params);
const updateBlogs = (id,params) => axios.put(`/blogs/${id}`, params);
const deleteBlogs = (id) => axios.delete(`/blogs/${id}`);
const deleteBlogImg = (id,imgId) => axios.delete(`/blogs/removeSingleImg/${id}/${imgId}`);

const blogService = {
  getAllBlogs,
  postBlogs,
  updateBlogs,
  deleteBlogs,
  deleteBlogImg
};
export default blogService;
