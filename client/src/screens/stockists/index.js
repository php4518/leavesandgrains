import React, { useState } from "react";
import { Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, } from "reactstrap";
import MenuHeader from "../../components/header/menuHeader";
import AppAlert from "../../components/alert";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { contactSupport } from "../../redux/actions/user";
import { Marker, Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import InfoWindowEx from "./InfoWindowEx";

const Stockists = () => {


  const data = [
    {
      name: "Mumbai",
      title: "Mumbai",
      lat: 19.0760,
      lng: 72.8777,
      id: 1
    },
    {
      name: "Surat",
      title: "Surat",
      lat: 21.203510,
      lng: 72.839230,
      id: 2
    },
    {
      name: "Pune",
      title: "pune",
      lat: 18.520430,
      lng: 73.856743,
      id: 3
    },
    {
      name: "Chennai",
      title: "Chennai",
      lat: 13.072090,
      lng: 80.201860,
      id: 4
    }
  ];

  const { state: { order } = {} } = useLocation();
  const dispatch = useDispatch();
  const { userStatus, currentUser = {} } = useSelector(({ user }) => {
    const { userStatus, currentUser } = user;
    return { userStatus, currentUser };
  });
  const { _id: customer, email = '', name = '' } = currentUser;
  const [places, setPlaces] = useState(data);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState();
  const [activeMarker, setActiveMarker] = useState();

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

  const containerStyle = {
    position: 'relative',
  }

  const centerMoved = (mapProps, map) => {

  }

  const mapClicked = (mapProps, map, clickEvent) => {

  }

  const onMarkerClick = (props, marker, e) => {
    setShowingInfoWindow(true);
    setSelectedPlace(props.place_);
    setActiveMarker(marker);
    // this.setState({
    //   selectedPlace: props,
    //   activeMarker: marker,
    //   showingInfoWindow: true
    // });
  }

  const onClose = (props) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  }

  const showDetails = (place) => {
    console.log(place);
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
          <hr />
          <div style={{ height: '100vh', width: '100%' }}>
            <Map
              google={window.google}
              zoom={8}
              containerStyle={containerStyle}
              initialCenter={{ lat: 19.0760, lng: 72.8777 }}
              onDragend={centerMoved}
              onClick={mapClicked}
              places={data}
            >
              {places.map((place, i) => {
                return (
                  <Marker
                    key={place.id}
                    place_={place}
                    onClick={onMarkerClick}
                    position={{ lat: place.lat, lng: place.lng }} />
                )
              })}
              <InfoWindowEx
                marker={activeMarker}
                visible={showingInfoWindow}
              >
                <div>
                  <h3>{selectedPlace?.name}</h3>
                  <button
                    type="button"
                    onClick={showDetails.bind(this, selectedPlace)}
                  >
                    Show details
                  </button>
                </div>
              </InfoWindowEx>
              {/* <InfoWindow
                visible={showingInfoWindow}
                marker={activeMarker}
                onClose={onClose}
              >
                <div>
                  <h1>hhhhh</h1>
                </div>
              </InfoWindow> */}
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
