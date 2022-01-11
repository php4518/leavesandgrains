import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Form, Row, } from "reactstrap";
import MenuHeader from "../../components/header/menuHeader";
import AppAlert from "../../components/alert";
import { useDispatch, useSelector } from "react-redux";
import { Marker, Map, GoogleApiWrapper } from 'google-maps-react';
import InfoWindowEx from "./InfoWindowEx";
import StoreModule from "../../components/store-module";
import { getStore, setStore } from "redux/actions/store";
import moment from "moment";
import DeleteStoreDetails from "../../components/store-module/delete-store";

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
  const [editStoreDetail, showEditStoreDetails] = useState(false);
  const [deleteStoreDetail, showDeleteStoreDetails] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [addStoreDetail, showAddStoreDetails] = useState(null);
  const [mapAddress, setMapAddress] = useState({ lat: 19.0760, lng: 72.8777 });
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const [isActive, setIsActive] = useState(0);


  useEffect(() => dispatch(getStore()), []);
  useEffect(() => setStore(allStore), [allStore]);
  useEffect(() => {
    if (addStoreDetail || editStoreDetail) {
      setIsForm(true);
      if (addStoreDetail)
        setMapAddress({ lat: 19.0760, lng: 72.8777 })
      else
        setMapAddress({ lat: 19.0760, lng: 72.8777 })
    } else {
      setIsForm(false);
      // setMapAddress({ lat: 19.0760, lng: 72.8777 })
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
    console.log("addressObject", addressObject);
  }

  //end search

  const containerStyle = {
    position: 'relative',
  }

  const centerMoved = (mapProps, map) => {
    console.log("map", map);
    console.log("mapProps", mapProps);
  }

  const mapClicked = (mapProps, map, clickEvent) => {
    console.log("lat", clickEvent.latLng.lat(), "long", clickEvent.latLng.lng());
  }

  const onMarkerClick = (props, marker, e) => {
    setShowingInfoWindow(true);
    setSelectedPlace(props.place_);
    setActiveMarker(marker);
  }

  const onListClick = (name) => {
    console.log("name", name);
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
          <>
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
                <Row>
                  <Col md="11">
                    <div id="abc" className="search-location-input">
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
                  {/* <Col md="3">
                    <Button className="btn-fill float-right" color="danger" size="lg">
                      Find Stores
                    </Button>
                  </Col> */}
                </Row>
                <Row>
                  <AppAlert alert={storeStatus} />
                </Row>
              </Col>
              <hr />
              <Row>
                <Col md="3">
                  <div style={{ height: '80vh', width: '100%', overflowY: 'scroll' }}>
                    <div className="list-group">
                      {allStore?.map((place, i) => (
                        <>
                          <a href="#" key={i} onClick={() => setIsActive(i)} className={`image list-group-item list-group-item-action flex-column align-items-start ${isActive === i && "active"}`}>
                            <div className="d-flex w-100 justify-content-between">
                              <h5 className="mb-1">{place.name}</h5>
                              <small>{moment(place.createdAt).format("MMM YYYY")}</small>
                            </div>
                            <p className="mb-1">{place.address}</p>
                            <Button className="btn" onClick={() => onListClick(place)}>View on map</Button>
                            {userRole && userRole?.role === "ADMIN" ?
                              <Row>
                                <Button
                                  aria-label="Edit"
                                  className="edit text col"
                                  type="button"
                                  onClick={() => showEditStoreDetails(true)}
                                >
                                  <span aria-hidden={true}><i className="fa fa-pencil" aria-hidden="true"></i></span>
                                </Button>
                                <Button
                                  aria-label="Delete"
                                  className="delete text col"
                                  type="button"
                                  onClick={() => showDeleteStoreDetails(true)}
                                >
                                  <span aria-hidden={true}><i className="fa fa-trash" aria-hidden="true"></i></span>
                                </Button>
                              </Row>
                              : null}
                          </a>

                        </>
                      ))}
                    </div>
                  </div>
                </Col>
                <Col>
                  <div style={{ height: '80vh', width: '100%' }}>
                    <Map
                      google={window.google}
                      zoom={8}
                      containerStyle={containerStyle}
                      initialCenter={mapAddress}
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
                          <h3 className="font-weight-bolder">{selectedPlace?.name}</h3>
                          <p>{selectedPlace?.address}</p>
                          <button
                            type="button"
                            onClick={showDetails.bind(this, selectedPlace)}
                          >
                            Directions
                          </button>
                        </div>
                      </InfoWindowEx>
                    </Map>
                  </div>
                </Col>
              </Row>
            </Container>
          </>
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
      <DeleteStoreDetails store={deleteStoreDetail} toggleModal={() => showDeleteStoreDetails(null)} />
    </>
  )
}

export default GoogleApiWrapper({
  // apiKey: "AIzaSyCKzWyGUy09ULraqdL5c30InR0qXl3FatA", my map
  apiKey: "AIzaSyDWkxGiLx48nPjU-y1lVh3Cvc1mlrqHRpU",
})(Stockists);
