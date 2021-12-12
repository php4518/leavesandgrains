import axios from 'axios';
import {BASE_URL} from '../helpers/config';
import {logoutUser} from "../redux/actions/user";

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
})

// API Request interceptor
service.interceptors.request.use(config => {
  const jwtToken = localStorage.getItem('AUTH_TOKEN');

  if (jwtToken) {
    config.headers["Authorization"] = `Bearer ${jwtToken}`;
  }
  return config;
}, error => {
  Promise.reject(error);
})

// API respone interceptor
service.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  if (error.response.status === 401) {
    if (error.response.data?.message === 'jwt expired') {
      console.log('Token Expired');
      logoutUser();
      return;
    }
  }
  return Promise.reject(error.response || error);
});

export default service;
