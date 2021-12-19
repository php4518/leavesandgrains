import {
    BLOG_STATUS,
    GET_BLOGS,
    POST_BLOGS,
    UPDATE_BLOGS,
    DELETE_BLOGS,
    DELETE_IMG,
    SET_BLOGS,
  } from '../constants/blog';
  
  export const getBlogs = (params = null) => {
    return { type: GET_BLOGS, params };
  };
  
  export const postBlogs = (params = null) => {
    return { type: POST_BLOGS, params };
  };
  
  export const updateBlogs = (id, params = []) => {
    return { type: UPDATE_BLOGS, id, params };
  };
  
  export const deleteBlogs = (id) => {
    return { type: DELETE_BLOGS, id };
  };
  
  export const deleteBlogImg = (id, imgId) => {
    return { type: DELETE_IMG, id, imgId };
  };
  
  export const setBlogs = (blogs = []) => {
    return { type: SET_BLOGS, blogs };
  };
  
  export const setBlogsStatus = (payload) => {
    return { type: BLOG_STATUS, payload };
  };
  