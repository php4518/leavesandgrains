import { all, call, delay, fork, put, select, takeLatest } from 'redux-saga/effects';
import { GET_STORE, GET_STORE_DATA, POST_STORE, UPDATE_STORE, DELETE_STORE } from '../constants/store';
import { setStore, setStoreStatus, setStoreData } from '../../redux/actions/store';
import storeService from '../../services/storeService';
import { STATUS } from "../../helpers/constants";

export function* getAllStoreAsync() {
  yield takeLatest(GET_STORE, function* ({ params } = {}) {
    try {
      yield put(setStoreStatus({ status: STATUS.LOADING }));
      const store = yield call(storeService.getAllStore, params);
      yield put(setStore(store));
      yield put(setStoreStatus({ status: STATUS.SUCCESS }));
    } catch (err) {
      console.log(err)
      yield put(setStoreStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export function* postStoreAsync() {
  yield takeLatest(POST_STORE, function* ({ params } = {}) {
    try {
      yield put(setStoreStatus({ status: STATUS.LOADING }));
      const { store: { store = [] } = {} } = yield select();
      const response = yield call(storeService.postNewStore, params);
      store.push(response);
      yield put(setStore(store));
      yield put(setStoreStatus({ status: STATUS.SUCCESS, message: 'Store added successfully' }));
      yield delay(2000);
      yield put(setStoreStatus());
    } catch (err) {
      console.log(err)
      yield put(setStoreStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export function* updateStoreAsync() {
  yield takeLatest(UPDATE_STORE, function* ({ id, params } = {}) {
    try {
      yield put(setStoreStatus({ status: STATUS.LOADING }));
      const { store: { store = [] } = {} } = yield select();
      const response = yield call(storeService.updateStore, id, params);
      const index = store.findIndex(a => a._id === id);
      if (index > -1) {
        store[index] = response
      }
      yield put(setStore(store));
      yield put(setStoreStatus({ status: STATUS.SUCCESS, message: 'Store update successfully' }));
      yield delay(2000);
      yield put(setStoreStatus());
    } catch (err) {
      console.log(err)
      yield put(setStoreStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export function* deleteStoreAsync() {
  yield takeLatest(DELETE_STORE, function* ({ id } = {}) {
    try {
      yield put(setStoreStatus({ status: STATUS.LOADING }));
      const { store: { store = [] } = {} } = yield select();
      yield call(storeService.deleteStore, id);
      const index = store.findIndex(a => a._id === id);
      if (index > -1) {
        store.splice(index, 1);
      }
      yield put(setStore(store));
      // yield put({ type: 'FETCH_SUCCESS', store });
      yield put(setStoreStatus({ status: STATUS.SUCCESS, message: 'Store delete successfully' }));
      yield delay(2000);
      yield put(setStoreStatus());
    } catch (err) {
      console.log(err)
      yield put(setStoreStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}


export function* getMealsAsync() {
  yield takeLatest(GET_STORE_DATA, function* ({ params } = {}) {
    try {
      yield put(setStoreStatus({ status: STATUS.LOADING }));
      const meals = yield call(storeService.getAllMeals, params);
      yield put(setStoreData(meals));
      yield put(setStoreStatus({ status: STATUS.SUCCESS }));
    } catch (err) {
      console.log(err)
      yield put(setStoreStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export default function* storeSaga() {
  yield all([
    fork(getAllStoreAsync),
    fork(getMealsAsync),
    fork(postStoreAsync),
    fork(updateStoreAsync),
    fork(deleteStoreAsync),
  ]);
}
