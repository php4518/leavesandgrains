import axios from 'axios';
import {AUTH_TOKEN, BASE_URL, TOKEN_PAYLOAD_KEY} from '../helpers/config';

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
})

// API Request interceptor
service.interceptors.request.use(config => {
  const jwtToken = localStorage.getItem(AUTH_TOKEN);

  if (jwtToken) {
    config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
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
      localStorage.removeItem(AUTH_TOKEN);
      window.location.reload();
    }
  }
  return Promise.reject(error);
});

export default service;
