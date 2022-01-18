import React, { useState, useEffect } from "react";
import { Modal, Button } from "reactstrap";
import { deleteStore } from '../../redux/actions/store';
import { useDispatch } from "react-redux";

const DeleteStoreDetails = ({ store = false, toggleModal }) => {
    const dispatch = useDispatch();
    const [addFields, setAddFields] = useState([]);

    useEffect(() => {
        setAddFields(store);
    }, [store]);

    const deletStoreRecord = () => {
        toggleModal();
        store = [];
        if (addFields?._id) {
            dispatch(deleteStore(addFields?._id));
        }
    };

    if (!store) return null

    return (
        <Modal isOpen={!!store} toggle={toggleModal} size="md" className="store-details">
            <div className="modal-header modal-title">
                Delete Store
                <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={() => { toggleModal(); store = []; }}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
                <p>Are you sure want to delete <b>{addFields?.name}</b> record..?</p>
            </div>
            <div className="modal-footer">
                <Button block className="btn-round w-25 my-3 my-sm-5 mx-auto" onClick={deletStoreRecord} color="danger" type="submit">
                    Delete
                </Button>
                <Button block className="btn-round w-25 my-3 my-sm-5 mx-auto" onClick={() => { toggleModal(); store = []; }} color="secondary" type="button">
                    Cancle
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteStoreDetails;