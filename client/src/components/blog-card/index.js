import React from "react";
import { Button, Col, Row } from "reactstrap";
import { getImageUrl } from "../../helpers/utils";
import moment from 'moment';

const BlogCard = ({
    blog, onViewClick = () => {
    }, onEditClick = () => {
    }, onDeleteClick = () => {
    }
}) => {

    var userRole = '';
    const userDetail = JSON.parse(localStorage.getItem("persist:user"));
    if (userDetail && userDetail?.currentUser) {
        userRole = JSON.parse(userDetail?.currentUser);
    }

    const labelClr = blog.category === "NUTRITION" ? "text-dark" :
        (blog.category === "TRAINING" ? "text-warning" :
            (blog.category === "TRANSFORMATION" ? "text-info" :
                (blog.category === "WELLBEING" ? "text-success" :
                    (blog.category === "WELLNESS" ? "text-primary" :
                        (blog.category === "NEWS" ? "text-danger" :
                            "alert alert-secondary")))));

    return (
        <>
            <div className="card dish-container">
                <img src={getImageUrl(blog.blogimage || '')} className="card-img-top image" alt="Card Image" />
                {userRole && userRole?.role === "ADMIN" ?
                    <Row className="middle" style={{ top: '30%' }}>
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
                <div className="card-body d-flex flex-column">
                    <p className="d-flex justify-content-end">
                        <span className="pr-2 text-dark">{moment(blog.createdAt).format("DD MMM YYYY")}</span>|
                        <strong className={`pl-2 font-weight-bolder ${labelClr}`}>{blog.category}</strong>
                    </p>
                    <p className="card-title-uppercase bold mt-2 font-weight-bolder"><strong>{blog.title}</strong></p>
                    <div style={{ display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {blog.description}
                    </div>
                    {/* <span className="mb-2" style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap',overflow: 'hidden'}}>{blog.description}</span> */}
                </div>
                <p className="text-dark p-0 ml-3 align-self-start btn btn-link" onClick={() => onViewClick(blog)}><strong>Read More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></strong></p>
            </div>

        </>
    )
}

export default BlogCard;