import { DISH_STATUS, SET_DISHES, SET_MEALS } from '../constants/dish';
import initialState from "./initialState";

// const initState = {
//   dishes: { loading: false, dishes: [], message: '' }
// };

const dish = (state = initialState.dishes, action) => {
  switch (action.type) {
    case DISH_STATUS: {
      return {
        ...state,
        dishStatus: action.payload,
      }
    }
    case SET_DISHES: {
      return {
        ...state,
        dishes: [...action.dishes],
      }
    }
    case SET_MEALS: {
      return {
        ...state,
        meals: action.meals,
      }
    }
    default:
      return state;
  }
};

export default dish;
