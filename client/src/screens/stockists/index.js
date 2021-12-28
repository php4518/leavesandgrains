import React, { useState } from "react";
import { Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, } from "reactstrap";
import MenuHeader from "../../components/header/menuHeader";
import AppAlert from "../../components/alert";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { contactSupport } from "../../redux/actions/user";
import { Marker, Map, GoogleApiWrapper } from 'google-maps-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Stockists = () => {

  const { state: { order } = {} } = useLocation();
  const dispatch = useDispatch();
  const { userStatus, currentUser = {} } = useSelector(({ user }) => {
    const { userStatus, currentUser } = user;
    return { userStatus, currentUser };
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

  const handleInputChange = (e) => setContactFields({ ...contactFields, [e.target.name]: e.target.value });

  const handleSupportQuery = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(contactSupport(contactFields));
  };
  const mapStyles = {
    width: "100%",
    height: "100%",
  };
  
  return (
    <>
      <MenuHeader />
      <div className="main">
        <Container>
          <Col className="ml-auto mr-auto" md="10">
            <div className="title">
              <h2 className="font-weight-bold">Stockists</h2>
            </div>
            <Form onSubmit={handleSupportQuery}>
              <Row>
                <Col md="8">
                  <Input
                    name="name"
                    value={currentUser.name}
                    placeholder="Name"
                    type="text"
                    required
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md="3">
                  <Button className="btn-fill" color="danger" size="lg">
                    Find Stores
                  </Button>
                </Col>
              </Row>
              <Row>
                <AppAlert alert={userStatus} />
              </Row>
            </Form>
          </Col>
        </Container>
        <hr />
        <Container>
          <div style={{ height: '70vh', width: '100%' }}>
            {/* <Map
              bootstrapURLKeys={{ key: "AIzaSyCKzWyGUy09ULraqdL5c30InR0qXl3FatA" }}
              defaultCenter={{
                lat: 19.07,
                lng: 72.87
              }}
              defaultZoom={6}
            >
              <Marker
                position={{ lat: 19.0760, lng: 72.8777 }}
              />
            </Map> */}
            <Map
              google={props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{ lat: 19.0760, lng: 72.8777 }}
            >
              <Marker position={{ lat: 19.0760, lng: 72.8777 }} />
            </Map>
          </div>
        </Container>
      </div>
    </>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCKzWyGUy09ULraqdL5c30InR0qXl3FatA",
})(Stockists);
