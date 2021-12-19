import React from "react";
import { Button, Col, Row } from "reactstrap";
import { getImageUrl } from "../../helpers/utils";

const BlogCard = ({
    blog, showDetails = true, onClick = () => {
    }, onEditClick = () => {
    }, onDeleteClick = () => {
    }, addItem = () => {
    }
}) => {
    const onAddItem = (e, quantity) => {
        e.stopPropagation();
        e.preventDefault();
        if (quantity < 0 || quantity > 20) {
            return;
        }
        blog.quantity = quantity;
        addItem(blog);
    };

    var userRole = '';
    const userDetail = JSON.parse(localStorage.getItem("persist:user"));
    if (userDetail && userDetail?.currentUser) {
        userRole = JSON.parse(userDetail?.currentUser);
    }

    return (
        <>
            {/* <div className="row">
                <div className="col-lg-4 mb-3 d-flex align-items-stretch">
                    <div className="card">
                        <img src={getImageUrl(blog.blogimage || '')} className="card-img-top" alt="Card Image" />
                        <div className="card-body d-flex flex-column">
                            <p className="d-flex justify-content-end">
                                <span>{blog.createdAt}</span>
                                <span>{blog.category}</span>
                            </p>
                            <h5 className="card-title">{blog.title}</h5>
                            <p className="card-text mb-4">{blog.description}</p>
                            <a href="#" onClick={() => onClick(blog)}><p className="text-dark mt-auto align-self-start"><strong>Read More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></strong></p></a>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="card">
                <img src={getImageUrl(blog.blogimage || '')} className="card-img-top" alt="Card Image" />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{blog.createdAt}</h5>
                    <p className="card-text mb-4">{blog.category}</p>
                    <a href="#" onClick={() => onClick(blog)}><p className="text-dark mt-auto align-self-start"><strong>Read More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></strong></p></a>
                </div>
            </div>
            {userRole && userRole?.role === "ADMIN" ?
                <Row className="middle">
                    <Button
                        aria-label="Edit"
                        className="edit text col"
                        type="button"
                        onClick={() => onEditClick(blog)}
                    >
                        <span aria-hidden={true}><i className="fa fa-pencil" aria-hidden="true"></i></span>
                    </Button>
                    <Button
                        aria-label="Delete"
                        className="delete text col"
                        type="button"
                        onClick={() => onDeleteClick(blog)}
                    >
                        <span aria-hidden={true}><i className="fa fa-trash" aria-hidden="true"></i></span>
                    </Button>
                </Row>
                : null}
        </>
    )
}

export default BlogCard;