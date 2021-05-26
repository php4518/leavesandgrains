import {
  ORDER_STATUS,
  OTP_STATUS,
  SET_MY_ORDERS,
  SET_NEW_USER_ADDRESS,
  SET_USER,
  SET_VERIFY_OTP,
  USER_STATUS
} from '../constants/user';
import initialState from "./initialState";

const user = (state = initialState.user, action) => {
  switch (action.type) {
    case SET_VERIFY_OTP: {
      return {
        ...state,
        showVerifyOtp: action.payload.show,
        otpHash: action.payload.otpHash,
      }
    }
    case SET_USER: {
      return {
        ...state,
        currentUser: action.user,
      }
    }
    case SET_NEW_USER_ADDRESS: {
      return {
        ...state,
        userAddresses: action.addresses,
      }
    }
    case USER_STATUS: {
      return {
        ...state,
        userStatus: action.payload
      }
    }
    case ORDER_STATUS: {
      return {
        ...state,
        orderStatus: action.payload
      }
    }
    case OTP_STATUS: {
      return {
        ...state,
        otpStatus: action.payload
      }
    }
    case SET_MY_ORDERS: {
      return {
        ...state,
        orders: action.orders
      }
    }
    default:
      return state;
  }
};

export default user;
