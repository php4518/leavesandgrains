import { BLOG_STATUS, SET_BLOGS } from '../constants/blog';
import initialState from "./initialState";

// const initState = {
//   blogs: { loading: false, blogs: [], message: '' }
// };

const blog = (state = initialState.blogs, action) => {
  switch (action.type) {
    case BLOG_STATUS: {
      return {
        ...state,
        blogStatus: action.payload,
      }
    }
    case SET_BLOGS: {
      return {
        ...state,
        blogs: [...action.blogs],
      }
    }
    default:
      return state;
  }
};

export default blog;
