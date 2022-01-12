import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Form, Row, } from "reactstrap";
import MenuHeader from "../../components/header/menuHeader";
import AppAlert from "../../components/alert";
import { useDispatch, useSelector } from "react-redux";
import { Marker, Map, GoogleApiWrapper } from 'google-maps-react';
import InfoWindowEx from "./InfoWindowEx";
import StoreCard from "../../components/store-module";
import AddStoreModule from "../../components/store-module/add-store";
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

  console.log("allStore",allStore);
  // console.log("store",store);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState();
  const [activeMarker, setActiveMarker] = useState();
  const [addStoreModule, showAddStoreModule] = useState(null);
  const [editStoreDetail, showEditStoreDetails] = useState(null);
  const [deleteStoreDetail, showDeleteStoreDetails] = useState(null);
  const [isForm, setIsForm] = useState(false);
  const [mapAddress, setMapAddress] = useState({ lat: 19.0760, lng: 72.8777 });
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const [isActive, setIsActive] = useState(0);


  useEffect(() => dispatch(getStore()), []);
  useEffect(() => setStore(allStore), [allStore]);
  useEffect(() => {
    if (addStoreModule || editStoreDetail) {
      setIsForm(true);
      if (addStoreModule)
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
        {!addStoreModule ?
          <>
            <Container>
              <Col lg={24} className="border-bottom">
                {userRole.role === "ADMIN" ?
                  <Button className="btn-info float-right" color="info" onClick={showAddStoreModule}>
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
                      {
                        (!allStore.length) ? <Col className="no-data-available">No blogs available</Col> :
                          allStore.map((item, index) =>
                              <StoreCard store={item} onViewClick={showingInfoWindow} onEditClick={showEditStoreDetails} onDeleteClick={showDeleteStoreDetails} />
                          )
                      }
                      {/* {allStore?.map((place, i) => (
                        <StoreCard store={item} />
                      ))} */}
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
              <AddStoreModule store={editStoreDetail} toggleModal={() => showEditStoreDetails(null)} />
              :
              <AddStoreModule store={addStoreModule} toggleModal={() => showAddStoreModule(null)} />
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
