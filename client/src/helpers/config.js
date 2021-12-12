const env = process.env;
export const ENV = env.NODE_ENV;
export const SERVER_URL = env.REACT_APP_API_URL;
export const BASE_URL = `${SERVER_URL}`;
export const IMAGE_BASE_URL = env.REACT_APP_IMAGE_BASE_URL;
export const RAZORPAY_ID = env.REACT_APP_RAZORPAY_ID;
export const RAZORPAY_SDK_URL = env.REACT_APP_RAZORPAY_SDK_URL;
