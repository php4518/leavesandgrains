import React, { useState, useEffect } from "react";
import { Modal, Button } from "reactstrap";
import { deleteBlogs } from '../../redux/actions/blog';
import { useDispatch } from "react-redux";

const DeleteBlogDetails = ({ blog = false, toggleModal }) => {
    const dispatch = useDispatch();
    const [addFields, setAddFields] = useState([]);

    useEffect(() => {
        setAddFields(blog);
    }, [blog]);

    const deletBlogRecord = () => {
        toggleModal();
        blog = [];
        if (addFields?._id) {
            dispatch(deleteBlogs(addFields?._id));
        }
    };

    if (!blog) return null

    return (
        <Modal isOpen={!!blog} toggle={toggleModal} size="md" className="blog-details">
            <div className="modal-header modal-title">
                Delete Blog
                <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={() => { toggleModal(); blog = []; }}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
                <p>Are you sure want to delete this record..?</p>
            </div>
            <div className="modal-footer">
                <Button block className="btn-round w-25 my-3 my-sm-5 mx-auto" onClick={deletBlogRecord} color="danger" type="submit">
                    Delete
                </Button>
                <Button block className="btn-round w-25 my-3 my-sm-5 mx-auto" onClick={() => { toggleModal(); blog = []; }} color="secondary" type="button">
                    Cancle
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteBlogDetails;