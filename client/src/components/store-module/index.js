import React from "react";
import { Button, Col, Row } from "reactstrap";
import { getImageUrl } from "../../helpers/utils";
import moment from 'moment';

const StoreCard = ({
    store, onViewClick = () => {
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
        // <a href="#" key={i} onClick={() => setIsActive(i)} className={`image list-group-item list-group-item-action flex-column align-items-start ${isActive === i && "active"}`}>
        <a href="#" className={`image list-group-item list-group-item-action flex-column align-items-start`}>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{store?.name}</h5>
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
        </a>
    )
}

export default StoreCard;