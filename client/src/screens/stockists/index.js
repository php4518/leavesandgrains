import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, } from "reactstrap";
import MenuHeader from "../../components/header/menuHeader";
import AppAlert from "../../components/alert";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { contactSupport } from "../../redux/actions/user";
import { Marker, Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import InfoWindowEx from "./InfoWindowEx";

let autoComplete;

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

  //search location


  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);


  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };


  useEffect(() => {
    handleScriptLoad(setQuery, autoCompleteRef)
  }, []);


  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ["(cities)"], componentRestrictions: { country: "us" } }
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log(addressObject);
  }

  //end search

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
                  <div className="search-location-input">
                    <input
                      ref={autoCompleteRef}
                      onChange={event => setQuery(event.target.value)}
                      placeholder="Enter a City"
                      value={query}
                    />
                  </div>
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