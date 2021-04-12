import React from "react";

import {Button, Card, Col, Container, Form, Input, Row} from "reactstrap";

const Register = () => {
  return (
    <div
      className="page-header"
      style={{
        backgroundImage:
          "url(" + require("assets/img/login-image.jpg").default + ")",
      }}
    >
      <div className="filter" />
      <Container>
        <Row>
          <Col className="ml-auto mr-auto mt-5" lg="4">
            <Card className="card-register ml-auto mr-auto">
              <h3 className="title mx-auto">Welcome</h3>
              <div className="social-line text-center">
                <Button
                  className="btn-neutral btn-just-icon mr-1"
                  color="facebook"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa fa-facebook-square" />
                </Button>
                <Button
                  className="btn-neutral btn-just-icon mr-1"
                  color="google"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa fa-google-plus" />
                </Button>
                <Button
                  className="btn-neutral btn-just-icon"
                  color="twitter"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa fa-twitter" />
                </Button>
              </div>
              <Form className="register-form">
                <label>Email</label>
                <Input placeholder="Email" type="text" />
                <label>Password</label>
                <Input placeholder="Password" type="password" />
                <Button block className="btn-round" color="danger">
                  Register
                </Button>
              </Form>
              <div className="forgot">
                <Button
                  className="btn-link"
                  color="danger"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot password?
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
