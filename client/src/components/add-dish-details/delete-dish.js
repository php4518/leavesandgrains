import React, { useState, useEffect } from "react";
import { Col, Modal, Button } from "reactstrap";
import { deleteDishes } from '../../redux/actions/dish';
import { useDispatch } from "react-redux";

const DeleteDishDetails = ({ dish = false, toggleModal }) => {
    const dispatch = useDispatch();
    const [addFields, setAddFields] = useState([]);

    useEffect(() => {
        setAddFields(dish);
    }, [dish]);

    const deletDishRecord = () => {
        toggleModal();
        dish = [];
        if (addFields?._id) {
            dispatch(deleteDishes(addFields?._id));
        }
    };

    if (!dish) return null

    return (
        <Modal isOpen={!!dish} toggle={toggleModal} size="md" className="dish-details">
            <div className="modal-header modal-title">
                Delete Dish
                <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={() => { toggleModal(); dish = []; }}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
                <p>Are you sure want to delete this record..?</p>
            </div>
            <div className="modal-footer">
                <Button block className="btn-round w-25 my-3 my-sm-5 mx-auto" onClick={deletDishRecord} color="danger" type="submit">
                    Delete
                </Button>
                <Button block className="btn-round w-25 my-3 my-sm-5 mx-auto" onClick={() => { toggleModal(); dish = []; }} color="secondary" type="button">
                    Cancle
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteDishDetails;