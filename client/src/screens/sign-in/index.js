import React, {useState} from "react";
import {Button, Card, Col, Container, Form, FormFeedback, Input, Row} from "reactstrap";
import {loginUser, verifyOTP} from "../../redux/actions/user";
import {useDispatch, useSelector} from "react-redux";
import {validatePhoneNumber} from "../../helpers/utils";
import OtpInput from "../../components/otp-input";
import AppAlert from "../../components/alert";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const { otpStatus, showVerifyOtp, userStatus, otpHash } = useSelector(({ user }) => {
    const { otpStatus, showVerifyOtp, userStatus, otpHash } = user;
    return { otpStatus, showVerifyOtp, userStatus, otpHash }
  });

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [inValidPhoneNumber, setInValidPhoneNumber] = useState(null);
  const [otp, setOtp] = useState(null);

  // if(pathname === '/sign-in/verifyEmail') {
  //   props.verifyAuthToken(search);
  //   history.replace('/sign-in')
  // }
  //
  // if(pathname === '/sign-in/resend-verification-email') {
  //   props.resendVerificationEmail(search);
  //   history.replace('/sign-in')
  // }
  //
  // if(pathname === '/sign-in/forgot-password') {
  //   props.resendVerificationEmail(search);
  //   history.replace('/sign-in')
  // }

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (validatePhoneNumber(phoneNumber)) {
      setInValidPhoneNumber(true);
      return;
    }
    setInValidPhoneNumber(false);
    dispatch(loginUser(phoneNumber));
  };

  const handleOtpVerification = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(verifyOTP({phoneNumber, otp, otpHash}));
  };

  return (
    <div
      className="page-header"
      style={{
        backgroundImage:
          "url(" + require("assets/img/login-image.jpg").default + ")",
      }}
    >
      <div className="filter"/>
      <Container>
        <Row>
          <Col className="ml-auto mr-auto mt-5" lg="4">
            <Card className="card-register ml-auto mr-auto">
              <h3 className="title mx-auto">Welcome</h3>
              <Form className="register-form" onSubmit={handleSubmit}>
                <label>Phone Number</label>
                <Input
                  name="phoneNumber"
                  value={phoneNumber}
                  placeholder="Phone Number"
                  type="text"
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  invalid={inValidPhoneNumber}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <FormFeedback>Sorry! that seems an invalid number.</FormFeedback>

                <Button block className="btn-round" color="danger">
                  send otp
                </Button>
              </Form>
              <AppAlert alert={userStatus}/>
              <div className="mt-3">
                Don't have an account? <Button className="btn-link p-0 mt-0" href="/sign-up">have a new one!</Button>
              </div>
            </Card>
          </Col>
        </Row>
        <OtpInput
          value={otp}
          onChange={(text) => setOtp(text)}
          numInputs={6}
          isInputNum
          separator={<span>-</span>}
          open={showVerifyOtp}
          onSubmit={handleOtpVerification}
          onResend={handleSubmit}
          status={otpStatus}
        />
      </Container>
    </div>
  );
}

export default SignIn;
