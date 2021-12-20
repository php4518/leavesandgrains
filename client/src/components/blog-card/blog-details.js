import React from "react";
import { Col, Modal, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { allGainDetails, getPrice } from "../../helpers/utils";
import ImageCarousel from "../image-carousel";

const BlogDetails = ({ blog = false, toggleModal }) => {

    if (!blog) return null
    return (

        <Row>
            <Col md="6" sm="12" className="pr-md-0">
                <ImageCarousel items={blog.images} />
            </Col>
            <Col md="6" sm="12" className="scroll-content">
                <div>
                    <h5 className="modal-title mb-3">{blog.title}</h5>
                    <div className="description">{blog.description}</div>
                    <Row className="mt-3 mb-2">
                        <Col><p className="blog-price">{getPrice(blog.price)}</p></Col>
                        <Col className="d-flex align-items-end justify-content-end">{allGainDetails(blog)}</Col>
                    </Row>
                    <div className="divider" />

                </div>
            </Col>
        </Row>
    )
}

export default BlogDetails;
