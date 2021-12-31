import React, { useState, useEffect, useRef } from "react";
import { Col, Modal, Button, Form, Input, Row } from "reactstrap";
import { postStore, updateStore, getStore } from '../../redux/actions/store';
import { useDispatch } from "react-redux";
import { BLOG_TYPES } from "../../helpers/constants";

var dataForm = new FormData();

const StoreModule = ({ store = false, toggleModal }) => {
  const dispatch = useDispatch();
  const [getPreviewImages, setPeviewImages] = useState([]);
  const [validationFields, setValidationFields] = useState({});
  const [initTinyValue, setInitTinyValue] = useState(undefined)

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
      dataForm.set('name', addFields.name)
      dataForm.set('address', addFields.address)
      dataForm.set('longDescription', addFields.longDescription)
      dataForm.set('category', addFields.category)
      dataForm.set('contributer', addFields.contributer)
      dataForm.set('isActive', addFields.isActive)

      if (!addFields?._id) {
        dispatch(postStore(dataForm));
        toggleModal();
        store = [];
        dispatch(getStore())
      } else {
        dispatch(updateStore(addFields._id, dataForm));
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
          </Row>
        </div>
        <div className="modal-footer">
          <Button block className="btn-round w-25 my-3 my-sm-5 mx-auto" color="danger" type="submit">
            {!addFields?._id ? 'Add' : 'Update'}
          </Button>
        </div>
      </Form >
    </div >
  )
}

export default StoreModule;
