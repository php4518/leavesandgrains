import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import {postStore, deleteStore, updateStore, getStore} from "../../redux/actions/store";
import {useDispatch, useSelector} from "react-redux";
import AppAlert from "../alert";
import {STATUS} from "../../helpers/constants";


const StoreModule = (props) => {
  const dispatch = useDispatch();
  const {storeList, storeStatus} = useSelector(({store}) => {
    const {storeList, storeStatus} = store;
    return {storeList, storeStatus}
  });

  const [addStoreData, showAddStoreData] = useState(false);
  const [storeFields, setStoreFields] = useState();

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    dispatch(getStore())
  }, []);

  useEffect(() => {
    if (storeStatus && storeStatus.status === STATUS.SUCCESS) {
      showAddStoreData(false);
    }
  }, [storeStatus]);

  const handleInputChange = (e) => setStoreFields({...storeFields, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (storeFields._id) {
      dispatch(updateStore(storeFields));
    } else {
      dispatch(postStore(storeFields));
    }
  };

  const handleEditStore = (e, store) => {
    e.preventDefault();
    e.stopPropagation();
    showAddStoreData(true);
    setStoreFields(store);
  };

  const handleDeleteStore = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteStore(id));
  };

  const handleSelectStore = (e, store) => {
    e.preventDefault();
    e.stopPropagation();
    props.onSelectStore(store);
    setTimeout(props.toggleModal, 700);
  };

  return (
    <div className={`store-page ${!props.show ? 'hide' : ''}`}>
      <div className="modal-body">
        <div className="header">
          <Button className="btn-info btn-close" color="danger" onClick={props.toggleModal}>
            Close
          </Button>
          <Button className="btn-info" color="info" onClick={() => showAddStoreData(!addStoreData)}>
            {addStoreData ? 'Use Existing store' : 'Add new store'}
          </Button>
          <h3>{addStoreData ? 'Add Store' : 'Select Store'}</h3>
          <AppAlert alert={storeStatus}/>
        </div>
        <div>
          {
            addStoreData ?
              <Container className="address-form">
                <Form onSubmit={handleSubmit}>
                  <Row className="mt-4">
                    <Col sm={6}>
                      <label>Full Name</label>
                      <Input
                        name="name"
                        value={storeFields.name}
                        type="text"
                        required
                        onChange={handleInputChange}
                      />
                      <label>Flat, House no., Building, Company, Apartment</label>
                      <Input
                        name="storeLine1"
                        value={storeFields.storeLine1}
                        type="text"
                        required
                        onChange={handleInputChange}
                      />
                      <label>Area, Colony, Street, Sector, Village</label>
                      <Input
                        name="storeLine2"
                        value={storeFields.storeLine2}
                        type="text"
                        required
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col sm={6}>
                      <label>Pincode</label>
                      <Input
                        name="pincode"
                        value={storeFields.pincode}
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
                        value={storeFields.landmark}
                        placeholder="e.g. near apple hospital"
                        type="text"
                        onChange={handleInputChange}
                      />
                      <Row>
                        <Col>
                          <label>City</label>
                          <Input
                            name="city"
                            value={storeFields.city}
                            type="text"
                            onChange={handleInputChange}
                            readOnly
                          />
                        </Col>
                        <Col>
                          <label>State</label>
                          <Input
                            name="state"
                            value={storeFields.state}
                            type="text"
                            onChange={handleInputChange}
                            readOnly
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Button block className="btn-round w-25 my-3 my-sm-5 mx-auto" color="danger" type="submit">
                    {storeFields._id ? 'update' : 'Add'}
                  </Button>
                </Form>
              </Container>
              :
              <div className="storees-wrapper">
                {
                  !storeList?.length ?
                    <div>No store added yet</div>
                    :
                    storeList?.map(store =>
                      <div
                        className={`store-card ${props.selectedStore && store._id === props.selectedStore._id ? 'selected' : ''}`}
                        key={store._id} onClick={(e) => handleSelectStore(e, store)}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="title mt-1 mb-0 font-weight-bold">{store.name}</div>
                          <div>
                            <span onClick={(e) => handleEditStore(e, store)}>Edit</span> | <span
                            onClick={(e) => handleDeleteStore(e, store._id)}>Delete</span></div>
                        </div>
                        <div className="description">{store?.storeLine1}</div>
                        <div className="description">{store?.storeLine2}</div>
                        <div className="description">{store?.landmark}</div>
                        <div className="description">{store?.pincode}</div>
                        <div className="description">{store?.city}, {store?.state}</div>
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

export default StoreModule;
