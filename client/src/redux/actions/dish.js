import {GET_DISHES, SET_DISHES, SHOW_DISHES_LOADING, SHOW_DISHES_MESSAGE,} from '../constants/dish';

export const getDishes = (params = null) => {
  return { type: GET_DISHES, params };
};

export const setDishes = (dishes = []) => {
  return { type: SET_DISHES, dishes };
};

export const showDishesLoading = (loading = false) => {
  return { type: SHOW_DISHES_LOADING, loading };
};

export const showDishesMessage = (message = '') => {
  return { type: SHOW_DISHES_MESSAGE, message };
};
