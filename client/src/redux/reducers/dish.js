import {SET_DISHES, SHOW_DISHES_LOADING, SHOW_DISHES_MESSAGE} from '../constants/dish';
import initialState from "./initialState";

// const initState = {
//   dishes: { loading: false, dishes: [], message: '' }
// };

const dish = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DISHES_LOADING: {
      return {
        ...state,
        dishes: {
          ...state.dishes,
          loading: action.loading,
        }
      }
    }
    case SHOW_DISHES_MESSAGE: {
      return {
        ...state,
        dishes: {
          ...state.dishes,
          message: action.message,
        }
      }
    }
    case SET_DISHES: {
      return {
        ...state,
        dishes: {
          ...state.dishes,
          dishes: [...action.dishes],
        }
      }
    }
    default:
      return state;
  }
};

export default dish;
