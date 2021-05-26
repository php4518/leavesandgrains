import React, {useState} from "react";
import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import AppAlert from "../alert";
import {updateUser} from "../../redux/actions/user";
import {useDispatch, useSelector} from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const {userStatus, currentUser} = useSelector(({user}) => {
    const {userStatus, currentUser} = user;
    return {userStatus, currentUser};
  });
  const {_id, email, name, phoneNumber} = currentUser;

  const [registerFields, setRegisterFields] = useState({email, name});

  const handleInputChange = (e) => setRegisterFields({...registerFields, [e.target.name]: e.target.value});

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(updateUser(_id, registerFields));
  };

  const isDisabled = registerFields.email === email && registerFields.name === name;

  return (
    <Container className="update-form">
      <Row>
        <Col>
          <Form onSubmit={handleProfileUpdate}>
            <label>Phone Number</label>
            <Input
              name="phoneNumber"
              value={phoneNumber}
              placeholder="Phone Number"
              disabled
            />
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
            />
            <Button block className="btn-round" color="danger" disabled={isDisabled}> Update </Button>
            <AppAlert alert={userStatus}/>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;
