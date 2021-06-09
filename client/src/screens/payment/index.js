import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, Container, Spinner} from "reactstrap";
import {useHistory, useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {placeOrder} from 'redux/actions/user';
import userService from 'services/userService';
import {STATUS} from "../../helpers/constants";
import {RAZORPAY_ID, RAZORPAY_SDK_URL} from '../../helpers/config';
import MenuHeader from "../../components/header/menuHeader";
import {formatAddress, getPrice} from "../../helpers/utils";

const Payment = () => {
  const history = useHistory();
  const {state: {address, amount} = {}} = useLocation();
  if (!address) {
    history.push('/');
  }

  const dispatch = useDispatch();
  const {orderStatus, currentUser} = useSelector(({user}) => {
    const {orderStatus, currentUser} = user;
    return {orderStatus, currentUser};
  });

  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    if (orderStatus && orderStatus.status) {
      if (orderStatus.status === STATUS.SUCCESS) {
        history.push('/profile', {orderStatus});
      } else if (orderStatus.status === STATUS.ERROR) {
        // TODO: display error
        setError(orderStatus.message || 'Error placing order');
      }
    }
  }, [orderStatus]);

  const loadPaymentModule = () => {
    setLoading(true);
    const script = document.createElement('script');
    script.src = RAZORPAY_SDK_URL;
    script.onload = displayPaymentModule;
    script.onerror = onError;
    document.body.appendChild(script);
  }

  const displayPaymentModule = async (response) => {
    if (response) {
      try {
        const details = await userService.getPaymentDetails({amount, customer: currentUser._id});
        setLoading(false);
        setOrderDetails(details);
        initializePaymentSDK(details);
      } catch (e) {
        onError(e);
      }
    } else {
      onError(response)
    }
  }

  const initializePaymentSDK = (details) => {
    if (details) {
      const options = {
        key: RAZORPAY_ID,
        currency: details.currency,
        amount: details.amount.toString(),
        order_id: details.id,
        name: 'Leaves and grains',
        description: 'Order Payment',
        handler: function (response) {
          if (response.razorpay_payment_id) {
            dispatch(placeOrder({address: address._id, amount, paymentDetails: response}));
          }
        },
        prefill: {
          name: currentUser.name,
          email: currentUser.email,
          contact: currentUser.phoneNumber
        },
        theme: {
          "color": "#f5593d"
        }
      }
      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        setError(response.error.description);
      });
      paymentObject.open()
    } else {
      onError('No details fetched from Razorpay');
    }
  }

  const onError = (error) => {
    setLoading(false);
    setError('Razorpay SDK failed to load. Are you online?');
    return;
  };

  const handleTryAgain = (e) => {
    e.stopPropagation();
    e.preventDefault();
    initializePaymentSDK(orderDetails);
  };

  return (
    <div>
      <MenuHeader/>
      <div className="title text-center">
        <h2 className="font-weight-bold mb-2">Payment Confirmation</h2>
        <Card className="w-25 mx-auto text-left">
          <CardBody>
            <h3 className="font-weight-bold mb-2">{currentUser.name}</h3>
            <h5><b>Amount:</b> {getPrice(amount)}</h5>
            <h5><b>Address:</b> {address.name}</h5>
            <h5>{formatAddress(address)}</h5>
          </CardBody>
        </Card>
        {
          loading ?
            <div className="app-loader mt-3">
              <Spinner color="danger"/>
            </div>
            :
            error ?
              <Container>
                <h4>
                  Oops!! sorry. It seems there's an issue placing your order.
                </h4>
                <div className="description my-3">{error}</div>
                <Button color="info" type="button" onClick={handleTryAgain}>
                  Try again
                </Button>
                <div className="">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Contact support
                  </Button>
                </div>
              </Container>
              :
              <Container>
                <Button color="info" size="lg" type="button" onClick={loadPaymentModule}>
                  Pay now
                </Button>
              </Container>
        }

      </div>
    </div>
  );
}

export default Payment;

