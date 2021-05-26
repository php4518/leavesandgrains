import React, {useState} from "react";
import {Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,} from "reactstrap";
import MenuHeader from "../../components/header/menuHeader";
import AppAlert from "../../components/alert";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import {contactSupport} from "../../redux/actions/user";

const Contact = () => {
  const {state: {order} = {}} = useLocation();
  const dispatch = useDispatch();
  const {userStatus, currentUser = {}} = useSelector(({user}) => {
    const {userStatus, currentUser} = user;
    return {userStatus, currentUser};
  });
  const {_id: customer, email = '', name = ''} = currentUser;

  const [contactFields, setContactFields] = useState({
    customer,
    order,
    email,
    name,
    subject: '',
    description: '',
  });

  const handleInputChange = (e) => setContactFields({...contactFields, [e.target.name]: e.target.value});

  const handleSupportQuery = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(contactSupport(contactFields));
  };

  return (
    <>
      <MenuHeader />
      <div className="main">
        <div className="section landing-section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="text-center">Contact US</h2>
                <Form className="contact-form" onSubmit={handleSupportQuery}>
                  <Row>
                    <Col md="6">
                      <label>Name</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="name"
                          value={currentUser.name}
                          placeholder="Name"
                          type="text"
                          required
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    </Col>
                    <Col md="6">
                      <label>Email</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-email-85"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="email"
                          value={currentUser.email}
                          placeholder="Email"
                          type="email"
                          required
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <label>Subject</label>
                  <Input
                    name="subject"
                    value={contactFields.subject}
                    placeholder="Subject"
                    required
                    onChange={handleInputChange}
                  />
                  <label>Description</label>
                  <Input
                    name="description"
                    value={contactFields.description}
                    placeholder="Tell us your queries..."
                    type="textarea"
                    rows="4"
                    required
                    onChange={handleInputChange}
                  />
                  <Row>
                    <Col className="ml-auto mr-auto" md="4">
                      <Button className="btn-fill" color="danger" size="lg">
                        Send Email
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <AppAlert alert={userStatus}/>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default Contact;
