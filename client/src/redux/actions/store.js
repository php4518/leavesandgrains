import {
    STORE_STATUS,
    GET_STORE,
    POST_STORE,
    UPDATE_STORE,
    DELETE_STORE,
    SET_STORE,
    GET_STORE_DATA,
    SET_STORE_DATA
  } from '../constants/store';
  
  export const getStore = (params = null) => {
    return { type: GET_STORE, params };
  };
   
  export const setStore = (store = []) => {
    return { type: SET_STORE, store };
  };
  
  export const getStoreData = (params = null) => {
    return { type: GET_STORE_DATA, params };
  };
  
  export const setStoreData = (meals = []) => {
    return { type: SET_STORE_DATA, meals };
  };

  export const postStore = (params = null) => {
    return { type: POST_STORE, params };
  };
  
  export const updateStore = (id, params = []) => {
    return { type: UPDATE_STORE, id, params };
  };
  
  export const deleteStore = (id) => {
    return { type: DELETE_STORE, id };
  };
  
  export const setStoreStatus = (payload) => {
    return { type: STORE_STATUS, payload };
  };
  