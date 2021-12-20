import { getImageUrl } from "helpers/utils";
import React from "react";
import { Col, Modal, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import MenuHeader from "../../components/header/menuHeader";

const BlogDetails = ({ blog = false }) => {

    if (!blog) return null
    return (
        <div className="order-page">
            <MenuHeader />
            <Col>
                <img src={getImageUrl(blog.blogimage)} width="auto" height="auto" />
                <div>
                    <h5 className="modal-title mb-3">{blog.title}</h5>
                    <div className="description">{blog.description}</div>
                    <div >{blog.longdescription}</div>
                    <div>{blog.writerName}</div>
                    <div >{blog.category}</div>
                    <div >{blog.contributer}</div>
                    <div>{blog.isActive}</div>
                    <div className="divider" />

                </div>
            </Col>
        </div >
    )
}

export default BlogDetails;
