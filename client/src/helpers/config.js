const env = process.env;
export const ENV = env.NODE_ENV;
export const SERVER_URL = env.REACT_APP_SERVER_URL;
export const BASE_URL = `${SERVER_URL}api`;
export const IMAGE_BASE_URL = `${SERVER_URL}public`;
export const TOKEN_PAYLOAD_KEY = env.REACT_APP_TOKEN_PAYLOAD_KEY;
export const RAZORPAY_ID = env.REACT_APP_RAZORPAY_ID;
export const RAZORPAY_SDK_URL = env.REACT_APP_RAZORPAY_SDK_URL;
