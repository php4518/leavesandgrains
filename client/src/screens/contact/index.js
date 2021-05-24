import React, {useEffect, useState} from "react";
import {
  Button,
  Col,
  Container, Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import MenuHeader from "../../components/header/menuHeader";
import AppAlert from "../../components/alert";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import {contactSupport} from "../../redux/actions/user";

const Contact = () => {
  const {state: { order } = {}} = useLocation();
  const dispatch = useDispatch();
  const { userStatus, currentUser } = useSelector(({ user }) => {
    const { userStatus , currentUser } = user;
    return { userStatus , currentUser };
  });
  const { _id: customer, email = '', name = '' } = currentUser;

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
      <MenuHeader/>
      <div className="section profile-content contact-page">
        <Container>
          <div className="owner">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("assets/img/faces/joe-gardner-2.jpg").default}
              />
            </div>
            <h2 className="title">Contact Us</h2>
          </div>
          <Row>
            <Col className="ml-auto mr-auto" md="6">
              <Form onSubmit={handleSupportQuery}>
                <label>Name</label>
                <Input
                  name="name"
                  value={currentUser.name}
                  placeholder="Name"
                  type="text"
                  required
                  onChange={handleInputChange}
                />
                <label>Email</label>
                <Input
                  name="email"
                  value={currentUser.email}
                  placeholder="Email"
                  type="email"
                  required
                  onChange={handleInputChange}
                />
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
                  placeholder="Description"
                  type="textarea"
                  required
                  onChange={handleInputChange}
                />
                <center>
                  <Button className="btn-round mt-4 mx-auto w-25" color="info"> submit </Button>
                </center>
                <AppAlert alert={userStatus}/>
              </Form>

            </Col>
          </Row>
          <br/>
        </Container>
      </div>
    </>
  );
}

export default Contact;
