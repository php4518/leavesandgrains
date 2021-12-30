import { STORE_STATUS, SET_STORE } from '../constants/store';
import initialState from "./initialState";

const store = (state = initialState.store, action) => {
    switch (action.type) {
        case STORE_STATUS: {
            return {
                ...state,
                storeStatus: action.payload,
            }
        }
        case SET_STORE: {
            return {
                ...state,
                store: [...action.store],
            }
        }
        default:
            return state;
    }
};

export default store;
