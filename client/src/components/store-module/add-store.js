import React, { useState, useEffect } from "react";
import { Col, Modal, Button, Form, Input, Row } from "reactstrap";
import { postStore, updateStore, getStore } from '../../redux/actions/store';
import { Marker, Map } from 'google-maps-react';
import { useDispatch } from "react-redux";

const StoreModule = ({ store = false, toggleModal }) => {

  const dispatch = useDispatch();
  // const { allStore, storeStatus } = useSelector(({ store }) => ({
  //   allStore: store,
  //   storeStatus: store.storeStatus,
  // }));

  const [validationFields, setValidationFields] = useState({});

  var userRole = '';
  const userDetail = JSON.parse(localStorage.getItem("persist:user"));
  if (userDetail && userDetail?.currentUser) {
    userRole = JSON.parse(userDetail?.currentUser);
  }

  const [addFields, setAddFields] = useState([]);
  const [markerPos, setMarkerPos] = useState();

  useEffect(() => {
    if (store?._id) {
      dispatch(getStore())
      setAddFields(store);
    }
    if (navigator.geolocation) {
      if (store?._id) {
        setMarkerPos(store)
      } else {
        navigator.geolocation.getCurrentPosition(
          position => {
            setMarkerPos(position.coords);
          }
        )
      }
    } else {
      console.log("turn on allow location")
    }
  }, []);

  const validateInputs = () => {
    let fields = {};
    setValidationFields(fields);
    return !Object.keys(fields).length;
  };

  const handleInputChange = (e) => {
    setAddFields({ ...addFields, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (validateInputs()) {
      if (!addFields?._id) {
        dispatch(postStore(addFields));
        toggleModal();
        store = [];
        dispatch(getStore())
      } else {
        dispatch(updateStore(addFields._id, addFields));
        toggleModal();
        store = [];
        dispatch(getStore())
      }
    }
  }

  const containerStyle = {
    position: 'relative',
  }

  const centerMoved = (coord, index) => {
    const { latLng } = coord;
    var lat = latLng.lat();
    var lng = latLng.lng();
    setMarkerPos({lat: lat, lng: lng})
    setAddFields({ ...addFields, ['lat']: lat, ['lng']: lng });
  }

  return (
    <div>
      <div className="modal-header modal-title">
        {!addFields?._id ?
          `Add New Store` :
          `Update Store Detail`
        }
        <i className="fa fa-times float-right close" aria-hidden="true" onClick={() => { toggleModal(); store = [] }}></i>
      </div>
      <Form onSubmit={handleSubmit} style={{ display: "contents" }}>
        <div className="modal-body">
          <Row>
            <label>Store name</label>
            <Input
              name="name"
              value={addFields?.name || ''}
              type="text"
              required
              onChange={handleInputChange}
            />
            <label>Address</label>
            <Input
              name="address"
              value={addFields?.address || ''}
              type="text"
              required
              onChange={handleInputChange}
            />
            <label>Select marker location</label>
            <div style={{ height: '50vh', width: '100%' }}>
              <Map
                google={window.google}
                zoom={5}
                containerStyle={containerStyle}
                initialCenter={{ lat: 21.1261679, lng: 73.123147 }}
              >
                <Marker
                  draggable={true}
                  position={{ lat: markerPos?.latitude || markerPos?.lat, lng: markerPos?.longitude || markerPos?.lng }}
                  onDragend={(t, map, coord) => centerMoved(coord, t)}
                />
              </Map>
            </div>
          </Row>
        </div>
        <div className="modal-footer">
          <Button block className="btn-round w-25 my-3 my-sm-5 mx-auto" color="danger" type="submit">
            {!addFields?._id ? 'Add' : 'Update'}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default StoreModule;
