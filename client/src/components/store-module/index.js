import React, { useState, useEffect, useRef } from "react";
import { Col, Modal, Button, Form, Input, Row } from "reactstrap";
import { postStore, updateStore, getStore } from '../../redux/actions/store';
import { useDispatch } from "react-redux";

const StoreModule = ({ store = false, toggleModal }) => {
  const dispatch = useDispatch();
  const [validationFields, setValidationFields] = useState({});

  var userRole = '';
  const userDetail = JSON.parse(localStorage.getItem("persist:user"));
  if (userDetail && userDetail?.currentUser) {
    userRole = JSON.parse(userDetail?.currentUser);
  }

  const [addFields, setAddFields] = useState([]);

  useEffect(() => {
    if (store?._id) {
      setAddFields(store);
    }
  }, [store]);

  useEffect(() => {
    dispatch(getStore())
    setAddFields(store);
  }, [])

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

  // if (!store) return null

  return (
    <div>
      <div className="modal-header modal-title">
        {!addFields?._id ?
          `Add New Store` :
          `Update Store Detail`
        }
        <i className="fa fa-times float-right close" aria-hidden="true" onClick={() => { toggleModal(false); store = [] }}></i>
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
            <label>Lat</label>
            <Input
              name="lat"
              value={addFields?.lat || ''}
              type="number"
              required
              onChange={handleInputChange}
            />
            <label>Lng</label>
            <Input
              name="lng"
              value={addFields?.lng || ''}
              type="number"
              required
              onChange={handleInputChange}
            />
            <label>Kilometer</label>
            <Input
              name="kilometer"
              value={addFields?.kilometer || ''}
              type="number"
              required
              onChange={handleInputChange}
            />
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
