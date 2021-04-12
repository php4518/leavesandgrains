import {SET_FUNDS, SHOW_FUNDS_LOADING,} from '../constants/home';
import initialState from "./initialState";
//
// const initState = {
//   funds: { loading: false, funds: [] }
// };

const home = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FUNDS_LOADING: {
      return {
        ...state,
        funds: {
          ...state.funds,
          loading: true,
        }
      }
    }
    case SET_FUNDS: {
      return {
        ...state,
        funds: {
          ...state.funds,
          loading: false,
          funds: [...action.funds],
        }
      }
    }
    default:
      return state;
  }
};

export default home;
