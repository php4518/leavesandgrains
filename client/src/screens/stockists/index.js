import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Form, Row, } from "reactstrap";
import MenuHeader from "../../components/header/menuHeader";
import AppAlert from "../../components/alert";
import { useDispatch, useSelector } from "react-redux";
import { Marker, Map, GoogleApiWrapper } from 'google-maps-react';
import InfoWindowEx from "./InfoWindowEx";
import StoreModule from "../../components/store-module";
import { getStore, setStore } from "redux/actions/store";

let autoComplete;

const Stockists = (props) => {

  const dispatch = useDispatch();
  const { allStore, storeStatus } = useSelector(({ store }) => ({
    allStore: store.store,
    storeStatus: store.storeStatus,
  }));

  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState();
  const [activeMarker, setActiveMarker] = useState();
  const [storeModule, showStoreModule] = useState(false);
  const [editStoreDetail, showEditStoreDetails] = useState(null);
  const [deleteStoreDetail, showDeleteStoreDetails] = useState(null);
  const [addStoreDetail, showAddStoreDetails] = useState(null);
  const [isForm, setIsForm] = useState(false);
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => dispatch(getStore()), []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => setStore(allStore), [allStore]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (addStoreDetail || editStoreDetail) {
      setIsForm(true);
    } else {
      setIsForm(false);
    }
  })

  useEffect(() => {
    handleScriptLoad(setQuery, autoCompleteRef)
  }, []);


  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ["(cities)"], componentRestrictions: { country: "in" } }
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

  const handleSupportQuery = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const containerStyle = {
    position: 'relative',
  }

  const centerMoved = (mapProps, map) => {
    console.log("map",map);
    console.log("mapProps",mapProps);
  }

  const mapClicked = (mapProps, map, clickEvent) => {
    console.log("lat",clickEvent.latLng.lat(), "long",clickEvent.latLng.lng());
  }

  const onMarkerClick = (props, marker, e) => {
    setShowingInfoWindow(true);
    setSelectedPlace(props.place_);
    setActiveMarker(marker);
  }

  const showDetails = (place) => {
    console.log(place);
  };

  var userRole = '';
  const userDetail = JSON.parse(localStorage.getItem("persist:user"));
  if (userDetail && userDetail?.currentUser) {
    userRole = JSON.parse(userDetail?.currentUser);
  }

  return (
    <>
      <MenuHeader />
      <div className="main">
        {!storeModule ?
          <Container>
            <Col lg={24} className="border-bottom">
              {userRole.role === "ADMIN" ?
                <Button className="btn-info float-right" color="info" onClick={(e) => showStoreModule(true)}>
                  Add New Store
                </Button>
                : null
              }
              <h3 className="text-uppercase font-weight-bold mb-3">Stockists</h3>
            </Col>
            <Col className="ml-auto mr-auto mt-5" md="10">
              <Form onSubmit={handleSupportQuery}>
                <Row>
                  <Col md="8">
                    <div className="search-location-input">
                      <input
                        className="form-control"
                        name="mapplace"
                        ref={autoCompleteRef}
                        onChange={event => setQuery(event.target.value)}
                        placeholder="Enter a City"
                        value={query}
                      />
                    </div>
                  </Col>
                  <Col md="3">
                    <Button className="btn-fill float-right" color="danger" size="lg">
                      Find Stores
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <AppAlert alert={storeStatus} />
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
                places={allStore}
              >
                {allStore?.map((place, i) => {
                  return (
                    <Marker
                      key={i}
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
          :
          <Container>
            {editStoreDetail && editStoreDetail !== '' ?
              <StoreModule store={editStoreDetail} toggleModal={() => showEditStoreDetails(null)} />
              :
              <StoreModule store={addStoreDetail} toggleModal={() => showAddStoreDetails(null)} />
            }
          </Container>
        }
      </div>
    </>
  )
}

export default GoogleApiWrapper({
  // apiKey: "AIzaSyCKzWyGUy09ULraqdL5c30InR0qXl3FatA", my map
  apiKey: "AIzaSyDWkxGiLx48nPjU-y1lVh3Cvc1mlrqHRpU",
})(Stockists);
