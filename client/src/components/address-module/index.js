import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import {addUserAddress, deleteUserAddresses, editUserAddresses, getUserAddresses} from "../../redux/actions/user";
import {useDispatch, useSelector} from "react-redux";
// import AppAlert from "../alert";
import {STATUS} from "../../helpers/constants";

const defaultFields = {
  city: 'Surat',
  state: 'Gujarat'
};

const AddressModule = (props) => {
  const dispatch = useDispatch();
  const {userAddresses, userStatus} = useSelector(({user}) => {
    const {userAddresses, userStatus} = user;
    return {userAddresses, userStatus}
  });

  const [addAddress, showAddAddress] = useState(false);
  const [addressFields, setAddressFields] = useState(defaultFields);

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    dispatch(getUserAddresses())
  }, []);

  useEffect(() => {
    if (userStatus && userStatus.status === STATUS.SUCCESS) {
      showAddAddress(false);
      setAddressFields(defaultFields);
    }
  }, [userStatus]);

  const handleInputChange = (e) => setAddressFields({...addressFields, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (addressFields._id) {
      dispatch(editUserAddresses(addressFields));
    } else {
      dispatch(addUserAddress(addressFields));
    }
  };

  const handleEditAddress = (e, address) => {
    e.preventDefault();
    e.stopPropagation();
    showAddAddress(true);
    setAddressFields(address);
  };

  const handleDeleteAddress = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteUserAddresses(id));
  };

  const handleSelectAddress = (e, address) => {
    e.preventDefault();
    e.stopPropagation();
    props.onSelectAddress(address);
    setTimeout(props.toggleModal, 700);
  };

  return (
    <div className={`address-page ${!props.show ? 'hide' : ''}`}>
      <div className="modal-body">
        <div className="header">
          <Button className="btn-info btn-close" color="danger" onClick={props.toggleModal}>
            Close
          </Button>
          <Button className="btn-info" color="info" onClick={() => showAddAddress(!addAddress)}>
            {addAddress ? 'Use Existing address' : 'Add new address'}
          </Button>
          <h3>{addAddress ? 'Add Address' : 'Select Address'}</h3>
          {/* <AppAlert alert={userStatus}/> */}
        </div>
        <div>
          {
            addAddress ?
              <Container className="address-form">
                <Form onSubmit={handleSubmit}>
                  <Row className="mt-4">
                    <Col sm={6}>
                      <label>Full Name</label>
                      <Input
                        name="name"
                        value={addressFields.name}
                        type="text"
                        required
                        onChange={handleInputChange}
                      />
                      <label>Flat, House no., Building, Company, Apartment</label>
                      <Input
                        name="addressLine1"
                        value={addressFields.addressLine1}
                        type="text"
                        required
                        onChange={handleInputChange}
                      />
                      <label>Area, Colony, Street, Sector, Village</label>
                      <Input
                        name="addressLine2"
                        value={addressFields.addressLine2}
                        type="text"
                        required
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col sm={6}>
                      <label>Pincode</label>
                      <Input
                        name="pincode"
                        value={addressFields.pincode}
                        type="text"
                        required
                        onChange={handleInputChange}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        maxLength={6}
                      />

                      <label>Landmark</label>
                      <Input
                        name="landmark"
                        value={addressFields.landmark}
                        placeholder="e.g. near apple hospital"
                        type="text"
                        onChange={handleInputChange}
                      />
                      <Row>
                        <Col>
                          <label>City</label>
                          <Input
                            name="city"
                            value={addressFields.city}
                            type="text"
                            onChange={handleInputChange}
                            readOnly
                          />
                        </Col>
                        <Col>
                          <label>State</label>
                          <Input
                            name="state"
                            value={addressFields.state}
                            type="text"
                            onChange={handleInputChange}
                            readOnly
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Button block className="btn-round w-25 my-3 my-sm-5 mx-auto" color="danger" type="submit">
                    {addressFields._id ? 'update' : 'Add'}
                  </Button>
                </Form>
              </Container>
              :
              <div className="addresses-wrapper">
                {
                  !userAddresses.length ?
                    <div>No address added yet</div>
                    :
                    userAddresses.map(address =>
                      <div
                        className={`address-card ${props.selectedAddress && address._id === props.selectedAddress._id ? 'selected' : ''}`}
                        key={address._id} onClick={(e) => handleSelectAddress(e, address)}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="title mt-1 mb-0 font-weight-bold">{address.name}</div>
                          <div>
                            <span onClick={(e) => handleEditAddress(e, address)}>Edit</span> | <span
                            onClick={(e) => handleDeleteAddress(e, address._id)}>Delete</span></div>
                        </div>
                        <div className="description">{address.addressLine1}</div>
                        <div className="description">{address.addressLine2}</div>
                        <div className="description">{address.landmark}</div>
                        <div className="description">{address.pincode}</div>
                        <div className="description">{address.city}, {address.state}</div>
                      </div>
                    )
                }
              </div>
          }
        </div>
      </div>
    </div>
  )
};

export default AddressModule;
