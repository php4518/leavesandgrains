import { getImageUrl } from "helpers/utils";
import React from "react";
import { Col, Row } from "reactstrap";
import MenuHeader from "../../components/header/menuHeader";
import moment from "moment";

const BlogDetails = ({ blog = false }) => {

    const labelClr = blog.category === "NUTRITION" ? "text-dark" :
        (blog.category === "TRAINING" ? "text-warning" :
            (blog.category === "TRANSFORMATION" ? "text-info" :
                (blog.category === "WELLBEING" ? "text-success" :
                    (blog.category === "WELLNESS" ? "text-primary" :
                        (blog.category === "NEWS" ? "text-danger" :
                            "alert alert-secondary")))));

    if (!blog) return null
    return (
        <div className="order-page">
            <MenuHeader />
            <Col className="offset-md-2" sm={16} md={8}>
                <div className="image-wrapper pt-5 pb-5" style={{ height: "700px", width: "100%" }}>
                    <img src={getImageUrl(blog.blogImage)} className="img" width="100%" height="100%" style={{ objectFit: "contain" }} />
                </div>
            </Col>
            <Col className="offset-md-3" sm={12} md={6}>
                <h2 className="modal-title mb-3">{blog.title}</h2>
                <Row className="d-flex p-3 mt-5 mb-5">
                    <img src="https://www.pngplay.com/wp-content/uploads/6/Avengers-A-Letter-Logo-Red-PNG.png" width={50} height={50} />
                    <Col>
                        <p>WRITTEN BY {blog.writerName}</p>
                        <p>Contributer - {blog.contributer}</p>
                    </Col>
                    <Col className="text-right">
                        <h5 className={`font-weight-bolder ${labelClr}`}>{blog.category}</h5>
                        <p>{moment(blog.updatedAt).format("DD MMMM YYYY")}</p>
                    </Col>
                </Row>
                <h5 className="font-weight-bold mb-3">{blog.description}</h5>
                <div dangerouslySetInnerHTML={{ __html: blog.longDescription }} className="mb-5" />
                <div className="divider" />
            </Col>
        </div >
    )
}

export default BlogDetails;
