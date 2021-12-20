import { all, call, delay, fork, put, select, takeLatest } from 'redux-saga/effects';
import { GET_BLOGS, POST_BLOGS, UPDATE_BLOGS, DELETE_BLOGS, DELETE_IMG } from '../constants/blog';
import { setBlogs, setBlogsStatus } from '../../redux/actions/blog';
import blogService from '../../services/blogServices';
import { STATUS } from "../../helpers/constants";

export function* getAllBlogsAsync() {
  yield takeLatest(GET_BLOGS, function* ({ params } = {}) {
    try {
      yield put(setBlogsStatus({ status: STATUS.LOADING }));
      const blogs = yield call(blogService.getAllBlogs, params);
      yield put(setBlogs(blogs));
      yield put(setBlogsStatus({ status: STATUS.SUCCESS }));
    } catch (err) {
      console.log(err)
      yield put(setBlogsStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export function* postBlogsAsync() {
  yield takeLatest(POST_BLOGS, function* ({ params } = {}) {
    try {
      yield put(setBlogsStatus({ status: STATUS.LOADING }));
      const { blog: { blogs = [] } = {} } = yield select();
      const response = yield call(blogService.postBlogs, params);
      blogs.push(response);
      yield put(setBlogs(blogs));
      yield put(setBlogsStatus({ status: STATUS.SUCCESS, message: 'Blog added successfully' }));
      yield delay(2000);
      yield put(setBlogsStatus());
    } catch (err) {
      console.log(err)
      yield put(setBlogsStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export function* updateBlogAsync() {
  yield takeLatest(UPDATE_BLOGS, function* ({ id, params } = {}) {
    try {
      yield put(setBlogsStatus({ status: STATUS.LOADING }));
      const { blog: { blogs = [] } = {} } = yield select();
      const response = yield call(blogService.updateBlogs, id, params);
      const index = blogs.findIndex(a => a._id === id);
      if (index > -1) {
        blogs[index] = response
      }
      yield put(setBlogs(blogs));
      yield put(setBlogsStatus({ status: STATUS.SUCCESS, message: 'Blog update successfully' }));
      yield delay(2000);
      yield put(setBlogsStatus());
    } catch (err) {
      console.log(err)
      yield put(setBlogsStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export function* deleteBlogAsync() {
  yield takeLatest(DELETE_BLOGS, function* ({ id } = {}) {
    try {
      yield put(setBlogsStatus({ status: STATUS.LOADING }));
      const { blog: { blogs = [] } = {} } = yield select();
      yield call(blogService.deleteBlogs, id);
      const index = blogs.findIndex(a => a._id === id);
      if (index > -1) {
        blogs.splice(index, 1);
      }
      yield put(setBlogs(blogs));
      // yield put({ type: 'FETCH_SUCCESS', Blog });
      yield put(setBlogsStatus({ status: STATUS.SUCCESS, message: 'Blog delete successfully' }));
      yield delay(2000);
      yield put(setBlogsStatus());
    } catch (err) {
      console.log(err)
      yield put(setBlogsStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export function* deleteBlogImgAsync() {
  yield takeLatest(DELETE_IMG, function* ({ id, imgId } = {}) {
    try {
      yield put(setBlogsStatus({ status: STATUS.LOADING }));
      const Blog = yield call(blogService.deleteBlogeImg, id, imgId);
      yield put(setBlogs(Blog));
      yield put(setBlogsStatus({ status: STATUS.SUCCESS }));
    } catch (err) {
      console.log(err)
      yield put(setBlogsStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export default function* BlogSaga() {
  yield all([
    fork(getAllBlogsAsync),
    fork(postBlogsAsync),
    fork(updateBlogAsync),
    fork(deleteBlogAsync),
    fork(deleteBlogImgAsync),
  ]);
}
