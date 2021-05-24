import axios from './index';

const registerUser = (params) => axios.post('/auth/register', params);
const verifyOTP = (params) => axios.post(`/auth/verifyOtp`, params);
const loginUser = (phone) => axios(`/auth/login?phoneNumber=${phone}`);
const verifyToken = (token) => axios(`/auth/verifyEmail${token}`);
const resendVerificationEmail = (email) => axios(`resend-verification-email?email=${email}`);

const authService = {
  registerUser,
  loginUser,
  verifyToken,
  resendVerificationEmail,
  verifyOTP
};
export default authService;
