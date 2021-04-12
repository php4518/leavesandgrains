import {GET_FUNDS, SET_FUNDS, SHOW_FUNDS_LOADING, SHOW_FUNDS_MESSAGE,} from '../constants/home';

export const getFunds = (params) => {
  return { type: GET_FUNDS, params };
};

export const setFunds = (funds) => {
  return { type: SET_FUNDS, funds };
};

export const showFundsLoading = () => {
  return { type: SHOW_FUNDS_LOADING };
};

export const showFundsMessage = (message) => {
  return { type: SHOW_FUNDS_MESSAGE, message };
};
