import React from "react";
import { Button, Col, Row } from "reactstrap";
import { getImageUrl } from "../../helpers/utils";
import moment from 'moment';

const BlogCard = ({
    blog, onClick = () => {
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
            <div className="card">
                <img src={getImageUrl(blog.blogimage || '')} className="card-img-top" alt="Card Image" />
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
                <div className="card-body d-flex flex-column">
                    <p className="d-flex justify-content-end">
                        <span className="pr-2 text-dark">{moment(blog.createdAt).format("DD MMM YYYY")}</span>|
                        <p className="font-weight-bolder"><strong className="text-danger pl-2">{blog.category}</strong></p>
                    </p>
                    <p className="card-title-uppercase bold mt-2 font-weight-bolder"><strong>{blog.title}</strong></p>
                    <small className="mb-2">{blog.description}</small>
                </div>
                <p className="text-dark mb-2 ml-3 align-self-start" onClick={() => onClick(blog)}><strong>Read More <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></strong></p>
            </div>

        </>
    )
}

export default BlogCard;