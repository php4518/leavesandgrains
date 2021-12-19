import {
  DISH_STATUS,
  GET_DISHES,
  GET_MEALS,
  POST_DISHES,
  UPDATE_DISHES,
  DELETE_DISHES,
  DELETE_IMG,
  SET_DISHES,
  SET_MEALS,
} from '../constants/dish';

export const getDishes = (params = null) => {
  return { type: GET_DISHES, params };
};

export const postDishes = (params = null) => {
  return { type: POST_DISHES, params };
};

export const updateDishes = (id, params = []) => {
  return { type: UPDATE_DISHES, id, params };
};

export const deleteDishes = (id) => {
  return { type: DELETE_DISHES, id };
};

export const deleteDishImg = (id, imgId) => {
  return { type: DELETE_IMG, id, imgId };
};

export const getMeals = (params = null) => {
  return { type: GET_MEALS, params };
};

export const setMeals = (meals = []) => {
  return { type: SET_MEALS, meals };
};

export const setDishes = (dishes = []) => {
  return { type: SET_DISHES, dishes };
};

export const setDishesStatus = (payload) => {
  return { type: DISH_STATUS, payload };
};
