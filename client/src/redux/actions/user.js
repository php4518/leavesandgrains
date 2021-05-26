import {
  ADD_USER_ADDRESS,
  CONTACT_SUPPORT,
  DELETE_USER_ADDRESS,
  EDIT_USER_ADDRESS,
  GET_MY_ORDERS,
  GET_USER_ADDRESSES,
  LOGIN_USER,
  LOGOUT_USER,
  ORDER_STATUS,
  OTP_STATUS,
  PLACE_ORDER,
  REGISTER_USER,
  SET_MY_ORDERS,
  SET_NEW_USER_ADDRESS,
  SET_USER,
  SET_VERIFY_OTP,
  UPDATE_USER,
  USER_STATUS,
  VERIFY_OTP
} from '../constants/user';

export const registerUser = (params = null) => {
  return {type: REGISTER_USER, params};
};

export const updateUser = (id, params = null) => {
  return {type: UPDATE_USER, id, params};
};

export const loginUser = (phone = null) => {
  return {type: LOGIN_USER, phone};
};

export const logoutUser = () => {
  localStorage.clear();
  window.location.href = '/sign-in';
  return {type: LOGOUT_USER};
};

export const setUser = (user) => {
  return {type: SET_USER, user};
};

export const setUserStatus = (payload) => {
  return {type: USER_STATUS, payload};
};

export const verifyOTP = (params) => {
  return {type: VERIFY_OTP, params};
};

export const setVerifyOtp = (payload) => {
  return {type: SET_VERIFY_OTP, payload};
};

export const setOtpStatus = (payload) => {
  return {type: OTP_STATUS, payload};
};

export const addUserAddress = (params) => {
  return {type: ADD_USER_ADDRESS, params};
};

export const setNewAddress = (addresses) => {
  return {type: SET_NEW_USER_ADDRESS, addresses};
};

export const getUserAddresses = (id) => {
  return {type: GET_USER_ADDRESSES, id};
};

export const editUserAddresses = (params) => {
  return {type: EDIT_USER_ADDRESS, params};
};

export const deleteUserAddresses = (id) => {
  return {type: DELETE_USER_ADDRESS, id};
};

export const placeOrder = (params) => {
  return {type: PLACE_ORDER, params};
};

export const getMyOrders = (id) => {
  return {type: GET_MY_ORDERS, id}
};

export const setMyOrders = (orders = []) => {
  return {type: SET_MY_ORDERS, orders}
};

export const setOrderStatus = (payload) => {
  return {type: ORDER_STATUS, payload}
};

export const contactSupport = (params) => {
  return {type: CONTACT_SUPPORT, params}
};
