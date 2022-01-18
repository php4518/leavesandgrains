import React from "react";
import { Button, Col, Row } from "reactstrap";
import moment from 'moment';

const StoreCard = ({
    store, isActive, onIsActive = () => {
    }, onViewClick = () => {
    }, onEditClick = () => {
    }, onDeleteClick = () => {
    }
}) => {

    var userRole = '';
    const userDetail = JSON.parse(localStorage.getItem("persist:user"));
    if (userDetail && userDetail?.currentUser) {
        userRole = JSON.parse(userDetail?.currentUser);
    }

    return (
        <>
            <li onClick={() => onIsActive()} className={`image list-group-item list-group-item-action flex-column align-items-start image ${isActive === store._id && "active"}`}>
                <div className="d-flex justify-content-between">
                    <h5 className="mb-1 font-weight-bolder">{store?.name}</h5>
                    <small>{moment(store?.createdAt).format("MMM YYYY")}</small>
                </div>
                <p className="mb-1">{store?.address}</p>
                <Button className="btn" onClick={() => onViewClick(store)}>View on map</Button>
           
            {userRole && userRole?.role === "ADMIN" ?
                <Row>
                    <Button
                        aria-label="Edit"
                        className="edit text col"
                        type="button"
                        onClick={() => onEditClick(store)}
                    >
                        <span aria-hidden={true}><i className="fa fa-pencil" aria-hidden="true"></i></span>
                    </Button>
                    <Button
                        aria-label="Delete"
                        className="delete text col"
                        type="button"
                        onClick={() => onDeleteClick(store)}
                    >
                        <span aria-hidden={true}><i className="fa fa-trash" aria-hidden="true"></i></span>
                    </Button>
                </Row>
                : null}
                 </li>
        </>
    )
}

export default StoreCard;