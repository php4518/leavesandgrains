import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import moment from 'moment';

const StoreCard = ({
    store, isActive, onIsActive = () => {
    }, onViewClick = () => {
    }, onEditClick = () => {
    }, onDeleteClick = () => {
    }
}) => {

    const [showText, setShowText] = useState("");
    var userRole = '';
    const userDetail = JSON.parse(localStorage.getItem("persist:user"));
    if (userDetail && userDetail?.currentUser) {
        userRole = JSON.parse(userDetail?.currentUser);
    }

    const onMouseOver = (e) => {
        setShowText("Delete me");
    }

    const onMouseOut = (e) => {
        setShowText("");
    }

    return (
        <li
            onClick={() => onIsActive()}
            onMouseEnter={onMouseOver.bind(this)}
            onMouseLeave={onMouseOut.bind(this)}
            className={`image list-group-item list-group-item-action flex-column align-items-start ${isActive === store._id && "active"}`}
        >
            <div className="d-flex justify-content-between">
                <h5 className="mb-1 font-weight-bolder">{store?.name}</h5>
                <small>{moment(store?.createdAt).format("MMM YYYY")}</small>
            </div>
            <p className="mb-1">{store?.address}</p>
            <Button className="btn-block" onClick={() => onViewClick(store)}>View on map</Button>
            {showText ?
                <>
                    {userRole && userRole?.role === "ADMIN" ?
                        <Row>
                            <Button
                                aria-label="Edit"
                                className="edit text col p-0"
                                type="button"
                                onClick={() => onEditClick(store)}
                            >
                                <span aria-hidden={true}><i className="fa fa-pencil" aria-hidden="true"></i></span>
                            </Button>
                            <Button
                                aria-label="Delete"
                                className="delete text col p-0"
                                type="button"
                                onClick={() => onDeleteClick(store)}
                            >
                                <span aria-hidden={true}><i className="fa fa-trash" aria-hidden="true"></i></span>
                            </Button>
                        </Row>
                        : null}
                </>
                : null}
        </li>
    )
}

export default StoreCard;