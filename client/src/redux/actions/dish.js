import {DISH_STATUS, GET_DISHES, GET_MEALS, SET_DISHES, SET_MEALS} from '../constants/dish';

export const getDishes = (params = null) => {
  return {type: GET_DISHES, params};
};

export const getMeals = (params = null) => {
  return {type: GET_MEALS, params};
};

export const setMeals = (meals = []) => {
  return {type: SET_MEALS, meals};
};

export const setDishes = (dishes = []) => {
  return {type: SET_DISHES, dishes};
};

export const setDishesStatus = (payload) => {
  return {type: DISH_STATUS, payload};
};
