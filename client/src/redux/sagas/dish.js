import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { GET_DISHES, GET_MEALS, POST_DISHES, UPDATE_DISHES, DELETE_DISHES, DELETE_IMG } from '../constants/dish';
import { setDishes, setDishesStatus, setMeals, postDishes, updateDishes, deleteDishes, deleteDishImg } from '../../redux/actions/dish';
import dishService from '../../services/dishService';
import { STATUS } from "../../helpers/constants";

export function* getAllDishesAsync() {
  yield takeLatest(GET_DISHES, function* ({ params } = {}) {
    try {
      yield put(setDishesStatus({ status: STATUS.LOADING }));
      const dishes = yield call(dishService.getAllDishes, params);
      yield put(setDishes(dishes));
      yield put(setDishesStatus({ status: STATUS.SUCCESS }));
    } catch (err) {
      console.log(err)
      yield put(setDishesStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export function* addDishAsync() {
  yield takeLatest(POST_DISHES, function* ({ params } = {}) {
    try {
      yield put(setDishesStatus({ status: STATUS.LOADING }));
      const response = yield call(dishService.postNewDishes, params);
      // yield put(postDishes(response));
      yield put(setDishesStatus({ status: STATUS.SUCCESS }));
    } catch (err) {
      console.log(err)
      yield put(setDishesStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export function* updateDishAsync() {
  yield takeLatest(UPDATE_DISHES, function* ({ id, params } = {}) {
    try {
      yield put(setDishesStatus({ status: STATUS.LOADING }));
      const dish = yield call(dishService.updateDishes, id, params);
      yield put(updateDishes(dish));
      yield put(setDishesStatus({ status: STATUS.SUCCESS }));
    } catch (err) {
      console.log(err)
      yield put(setDishesStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export function* deleteDishAsync() {
  yield takeLatest(DELETE_DISHES, function* ({ id } = {}) {
    try {
      // yield put(setDishesStatus({ status: STATUS.LOADING }));
      const dish = yield call(dishService.deleteDishes, id);
      console.log("dish", dish);
      // yield put(deleteDishes(dish));
      yield put({ type: 'FETCH_SUCCESS', dish });
      yield put(setDishesStatus({ status: STATUS.SUCCESS }));
    } catch (err) {
      console.log(err)
      yield put(setDishesStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export function* deleteDishImgAsync() {
  yield takeLatest(DELETE_IMG, function* ({ id, imgId } = {}) {
    try {
      yield put(setDishesStatus({ status: STATUS.LOADING }));
      const dish = yield call(dishService.deleteDisheImg, id, imgId);
      yield put(deleteDishImg(dish));
      yield put(setDishesStatus({ status: STATUS.SUCCESS }));
    } catch (err) {
      console.log(err)
      yield put(setDishesStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export function* getMealsAsync() {
  yield takeLatest(GET_MEALS, function* ({ params } = {}) {
    try {
      yield put(setDishesStatus({ status: STATUS.LOADING }));
      const meals = yield call(dishService.getAllMeals, params);
      yield put(setMeals(meals));
      yield put(setDishesStatus({ status: STATUS.SUCCESS }));
    } catch (err) {
      console.log(err)
      yield put(setDishesStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export default function* dishSaga() {
  yield all([
    fork(getAllDishesAsync),
    fork(getMealsAsync),
    fork(addDishAsync),
    fork(updateDishAsync),
    fork(deleteDishAsync),
    fork(deleteDishImgAsync),
  ]);
}
