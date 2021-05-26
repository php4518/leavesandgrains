import {all, call, delay, fork, put, select, takeLatest} from 'redux-saga/effects';
import moment from "moment";
import history from "../../helpers/history";
import {
  ADD_USER_ADDRESS,
  CONTACT_SUPPORT,
  DELETE_USER_ADDRESS,
  EDIT_USER_ADDRESS,
  GET_MY_ORDERS,
  GET_USER_ADDRESSES,
  LOGIN_USER,
  PLACE_ORDER,
  REGISTER_USER,
  UPDATE_USER,
  VERIFY_OTP
} from 'redux/constants/user';
import authService from 'services/authService';
import {
  setMyOrders,
  setNewAddress,
  setOrderStatus,
  setOtpStatus,
  setUser,
  setUserStatus,
  setVerifyOtp
} from "../actions/user";
import {resetCart} from "../actions/cart";
import userService from "../../services/userService";
import {STATUS} from "../../helpers/constants";
import {cloneDeep} from "lodash";

export function* registerUserAsync() {
  yield takeLatest(REGISTER_USER, function* ({params} = {}) {
    try {
      yield put(setUserStatus({status: STATUS.LOADING}));
      const response = yield call(authService.registerUser, params);
      yield put(setVerifyOtp({show: true, otpHash: response.otpHash}));
      yield put(setUserStatus({status: STATUS.SUCCESS}));
    } catch (err) {
      console.log(err)
      yield put(setUserStatus({status: STATUS.ERROR, message: err.data.message}));
    }
  });
}

export function* loginUserAsync() {
  yield takeLatest(LOGIN_USER, function* ({phone} = {}) {
    try {
      yield put(setUserStatus({status: STATUS.LOADING}));
      const response = yield call(authService.loginUser, phone);
      yield put(setVerifyOtp({show: true, otpHash: response.otpHash}));
      yield put(setUserStatus({status: STATUS.SUCCESS}));
    } catch (err) {
      console.log(err)
      yield put(setUserStatus({status: STATUS.ERROR, message: err.data.message}));
    }
  });
}

export function* verifyOTPAsync() {
  yield takeLatest(VERIFY_OTP, function* ({params} = {}) {
    try {
      yield put(setOtpStatus({status: STATUS.LOADING}));
      console.log('OTP HASH: ', params);
      const response = yield call(authService.verifyOTP, params);
      if (response.user) {
        yield put(setVerifyOtp({show: false, otpHash: null}));
        localStorage.setItem('AUTH_TOKEN', response.token)
        yield put(setUser(response.user));
        const lastPath = new URL(document.referrer).pathname.split('/').pop()
        history.push(lastPath === "cart" ? "/cart" : "/");
      } else {
        yield put(setOtpStatus({status: STATUS.ERROR, message: response.message}));
      }
    } catch (err) {
      yield put(setOtpStatus({status: STATUS.ERROR, message: err.data.message}));
    }
  });
}

export function* updateUserAsync() {
  yield takeLatest(UPDATE_USER, function* ({id, params} = {}) {
    try {
      yield put(setUserStatus({status: STATUS.LOADING}));
      const response = yield call(userService.updateUser, id, params);
      yield put(setUser(response));
      yield put(setUserStatus({status: STATUS.SUCCESS}));
    } catch (err) {
      yield put(setUserStatus({status: STATUS.ERROR, message: err.data.message}));
    }
  });
}

export function* addUserAddressAsync() {
  yield takeLatest(ADD_USER_ADDRESS, function* ({params} = {}) {
    try {
      yield put(setUserStatus({status: STATUS.LOADING}));
      const {user: {userAddresses = [], currentUser} = {}} = yield select();
      params.owner = currentUser._id;
      const response = yield call(userService.addAddress, params);
      userAddresses.push(response);
      yield put(setNewAddress(userAddresses));
      yield put(setUserStatus({status: STATUS.SUCCESS, message: 'Address added successfully'}));
      yield delay(2000);
      yield put(setUserStatus());
    } catch (err) {
      console.log(err)
      yield put(setUserStatus({status: STATUS.ERROR, message: err.data.message}));
    }
  });
}

export function* getUserAddressesAsync() {
  yield takeLatest(GET_USER_ADDRESSES, function* () {
    try {
      const {user: {currentUser} = {}} = yield select();
      if (currentUser) {
        yield put(setUserStatus({status: STATUS.LOADING}));
        const addresses = yield call(userService.getAddress, currentUser._id);
        yield put(setNewAddress(addresses));
        yield put(setUserStatus({status: STATUS.SUCCESS}));
      }
    } catch (err) {
      console.log(err)
      yield put(setUserStatus({status: STATUS.ERROR, message: err.data.message}));
    }
  });
}

export function* editUserAddressAsync() {
  yield takeLatest(EDIT_USER_ADDRESS, function* ({params} = {}) {
    try {
      yield put(setUserStatus({status: STATUS.LOADING}));
      const {user: {userAddresses} = {}} = yield select();
      const updated = yield call(userService.updateAddress, params);
      const index = userAddresses.findIndex(a => a._id === params._id);
      if (index > -1) {
        userAddresses[index] = updated
      }
      yield put(setNewAddress(userAddresses));
      yield put(setUserStatus({status: STATUS.SUCCESS, message: 'Address edited successfully'}));
      yield delay(2000);
      yield put(setUserStatus());
    } catch (err) {
      console.log(err)
      yield put(setUserStatus({status: STATUS.ERROR, message: err.data.message}));
    }
  });
}

export function* deleteUserAddressAsync() {
  yield takeLatest(DELETE_USER_ADDRESS, function* ({id} = {}) {
    try {
      yield put(setUserStatus({status: STATUS.LOADING}));
      const {user: {userAddresses} = {}} = yield select();
      yield call(userService.deleteAddress, id);
      const index = userAddresses.findIndex(a => a._id === id);
      if (index > -1) {
        userAddresses.splice(index, 1);
      }
      yield put(setNewAddress(userAddresses));
      yield put(setUserStatus({status: STATUS.SUCCESS, message: 'Address deleted successfully'}));
      yield delay(2000);
      yield put(setUserStatus());
    } catch (err) {
      console.log(err)
      yield put(setUserStatus({status: STATUS.ERROR, message: err.data.message}));
    }
  });
}

export function* placeOrderAsync() {
  yield takeLatest(PLACE_ORDER, function* ({params}) {
    try {
      const {address, amount: totalAmount, paymentDetails} = params;
      const {
        user: {currentUser: {_id: customer}} = {},
        cart: {individualMeals: ims, mealPlans: mps}
      } = yield select();

      let individualMeals = cloneDeep(ims);
      let mealPlans = cloneDeep(mps);

      individualMeals = Object.values(individualMeals).map(({_id, title, quantity, deliveryDate}) => ({
        _id,
        title,
        quantity,
        deliveryDate,
      }));

      mealPlans.forEach(mp => {
        mp.plan = Object.values(mp.plan).reduce((planArray, obj, i) => {
          let planObj = {};
          planObj.deliveryDate = moment(mp.start).add(i, 'days');
          planObj.dayLabel = `Day ${i + 1}`;
          planObj.items = obj.map(m => ({_id: m.mealObj._id, title: m.mealObj.title, label: m.label}));
          planArray.push(planObj);
          return planArray;
        }, []);
      });

      const order = {
        address,
        customer,
        totalAmount,
        individualMeals,
        mealPlans,
        paymentDetails
      }
      yield put(setOrderStatus({status: STATUS.LOADING}));
      yield call(userService.placeOrder, order);
      yield put(resetCart());
      yield put(setOrderStatus({status: STATUS.SUCCESS, message: 'Order Placed Successfully'}));
    } catch (err) {
      console.log(err)
      yield put(setOrderStatus({status: STATUS.ERROR, message: err.data.message}));
    }
  });
}

export function* getMyOrdersAsync() {
  yield takeLatest(GET_MY_ORDERS, function* ({id}) {
    try {
      yield put(setOrderStatus({status: STATUS.LOADING}));
      const orders = yield call(userService.myOrders, id);
      yield put(setMyOrders(orders))
      yield put(setOrderStatus({status: STATUS.SUCCESS}));
    } catch (err) {
      console.log(err)
      yield put(setOrderStatus({status: STATUS.ERROR, message: err.data.message}));
    }
  });
};

export function* contactSupportAsync() {
  yield takeLatest(CONTACT_SUPPORT, function* ({params}) {
    try {
      yield put(setUserStatus({status: STATUS.LOADING}));
      const response = yield call(userService.contactSupport, params);
      yield put(setUserStatus({status: STATUS.SUCCESS, message: response}));
      yield delay(5000);
      yield put(setUserStatus());
    } catch (err) {
      console.log(err)
      yield put(setUserStatus({status: STATUS.ERROR, message: err.data.message}));
    }
  });
};


export default function* userSaga() {
  yield all([
    fork(registerUserAsync),
    fork(loginUserAsync),
    fork(verifyOTPAsync),
    fork(addUserAddressAsync),
    fork(getUserAddressesAsync),
    fork(editUserAddressAsync),
    fork(deleteUserAddressAsync),
    fork(placeOrderAsync),
    fork(getMyOrdersAsync),
    fork(updateUserAsync),
    fork(contactSupportAsync),
  ]);
}
