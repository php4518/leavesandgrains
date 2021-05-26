import React, {useState} from "react";

import {Button, Card, Col, Container, Form, FormFeedback, Input, Row} from "reactstrap";
import {validatePassword, validatePhoneNumber} from "../../helpers/utils";
import {registerUser, verifyOTP} from "../../redux/actions/user";
import OtpInput from "../../components/otp-input";
import {useDispatch, useSelector} from "react-redux";
import AppAlert from "../../components/alert";

const SignUp = () => {
  const dispatch = useDispatch();
  const {otpStatus, showVerifyOtp, userStatus, otpHash} = useSelector(({user}) => {
    const {otpStatus, showVerifyOtp, userStatus, otpHash} = user;
    return {otpStatus, showVerifyOtp, userStatus, otpHash}
  });

  const [registerFields, setRegisterFields] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phoneNumber: ''
  });

  const [validationFields, setValidationFields] = useState({});
  const [otp, setOtp] = useState(null);

  const validateInputs = () => {
    let fields = {};
    if (validatePassword(registerFields.password)) {
      fields.password = 'invalid';
    }
    if (validatePhoneNumber(registerFields.phoneNumber)) {
      fields.phoneNumber = 'invalid';
    }
    setValidationFields(fields);
    return !Object.keys(fields).length;
  };

  const handleInputChange = (e) => setRegisterFields({...registerFields, [e.target.name]: e.target.value});

  const handleRegister = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (validateInputs()) {
      delete registerFields.confirmPassword;
      dispatch(registerUser(registerFields));
    }
  };

  const handleOtpVerification = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(verifyOTP({phoneNumber: registerFields.phoneNumber, otp, otpHash}));
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
          <Col className="ml-auto mr-auto mt-5" lg="8">
            <Card className="card-register ml-auto mr-auto">
              <h3 className="title mx-auto">Register</h3>
              <Form className="register-form" onSubmit={handleRegister}>
                <label>Phone Number</label>
                <Input
                  name="phoneNumber"
                  value={registerFields.phoneNumber}
                  placeholder="Phone Number"
                  type="tel"
                  required
                  onChange={handleInputChange}
                  invalid={validationFields.phoneNumber}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <FormFeedback>Sorry! that seems an invalid number.</FormFeedback>

                <label>Name</label>
                <Input
                  name="name"
                  value={registerFields.name}
                  placeholder="Name"
                  type="text"
                  required
                  onChange={handleInputChange}
                />
                <label>Email</label>
                <Input
                  name="email"
                  value={registerFields.email}
                  placeholder="Email"
                  type="email"
                  required
                  onChange={handleInputChange}
                  invalid={validationFields.email}
                />
                <FormFeedback>Sorry! that seems an invalid email.</FormFeedback>

                <label>Create Password</label>
                <Input
                  name="password"
                  value={registerFields.password}
                  placeholder="Create Password"
                  type="password"
                  required
                  onChange={handleInputChange}
                  invalid={validationFields.password}
                />
                <FormFeedback>Sorry! password should be 6 characters long.</FormFeedback>

                <Button block className="btn-round" color="danger">
                  Register
                </Button>
                <AppAlert alert={userStatus}/>
              </Form>
              <div className="mt-3">
                Already have an account? <Button className="btn-link p-0 mt-0" href="/sign-in">Login here!</Button>
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
          status={otpStatus}
        />
      </Container>
    </div>
  );
}

export default SignUp;
