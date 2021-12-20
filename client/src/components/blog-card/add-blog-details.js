import React, { useState, useEffect } from "react";
import { Col, Modal, Button, Form, Input, Row } from "reactstrap";
import { postBlogs, updateBlogs, deleteBlogImg, getBlogs } from '../../redux/actions/blog';
import { useDispatch } from "react-redux";
import { getImageUrl } from "../../helpers/utils";

var dataForm = new FormData();

const AddBlogDetails = ({ blog = false, toggleModal }) => {
    const dispatch = useDispatch();
    const [getPreviewImages, setPeviewImages] = useState([]);
    const [getImages, setGetImages] = useState({});
    const [validationFields, setValidationFields] = useState({});
    const [formValues, setFormValues] = useState([])

    var userRole = '';
    const userDetail = JSON.parse(localStorage.getItem("persist:user"));
    if (userDetail && userDetail?.currentUser) {
        userRole = JSON.parse(userDetail?.currentUser);
    }

    const defaultFields = {
        writerName: userRole.name
    };


    const [addFields, setAddFields] = useState(defaultFields);

    useEffect(() => {
        if (blog?._id) {
            setAddFields(blog);
            setGetImages(blog?.blogimage);
            setPeviewImages(getImageUrl(blog?.blogimage));
        }
    }, [blog]);

    useEffect(() => {
        dispatch(getBlogs())
        setAddFields(blog, defaultFields);
    }, [])

    const validateInputs = () => {
        let fields = {};
        // if (validatePassword(addFields.password)) {
        //     fields.password = 'invalid';
        // }
        // if (validatePhoneNumber(addFields.phoneNumber)) {
        //     fields.phoneNumber = 'invalid';
        // }
        setValidationFields(fields);
        return !Object.keys(fields).length;
    };

    const handleInputChange = (e) => {
        if (e.target.name === "blogimage") {
            if (e.target.files[0].name.match(/\.(jpg|jpeg|png|tif|tiff|gif)$/)) {
                var blogimage = URL.createObjectURL(e.target.files[0]);
                setPeviewImages(blogimage);
                dataForm.set('blogimage', e.target.files[0])
            }
            else {
                return;
            }

        } else if (e.target.name === "isActive") {
            setAddFields({ ...addFields, [e.target.name]: e.target.checked });
        } else {
            setAddFields({ ...addFields, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (validateInputs()) {
            dataForm.set('title', addFields.title)
            dataForm.set('description', addFields.description)
            dataForm.set('longdescription', addFields.longdescription)
            dataForm.set('writerName', defaultFields.writerName)
            dataForm.set('category', addFields.category)
            dataForm.set('contributer', addFields.contributer)
            dataForm.set('isActive', addFields.isActive)

            if (!addFields?._id) {
                dispatch(postBlogs(dataForm));
                toggleModal();
                blog = [];
                dispatch(getBlogs())
            } else {
                dispatch(updateBlogs(addFields._id, dataForm));
                toggleModal();
                blog = [];
                dispatch(getBlogs())
            }
        }
    }

    if (!blog) return null

    return (
        // <Modal isOpen={!!blog} toggle={toggleModal} size="xl" className="blog-details">
        <div>
            <div className="modal-header modal-title">
                {!addFields?._id ?
                    `Add New Blog` :
                    `Update Blog Detail`
                }
                <Button
                    aria-label="Close"
                    className="close float-right"
                    type="button"
                    onClick={() => { toggleModal(); blog = [] }}
                >
                    <span aria-hidden={true}>×</span>
                </Button>
            </div>
            <Form onSubmit={handleSubmit} style={{ display: "contents" }}>
                <div className="modal-body">
                    <Row>
                        <label>Blog name</label>
                        <Input
                            name="title"
                            value={addFields?.title || ''}
                            type="text"
                            required
                            onChange={handleInputChange}
                        />
                        <label>Discription</label>
                        <Input
                            name="description"
                            value={addFields?.description || ''}
                            type="text"
                            required
                            onChange={handleInputChange}
                        />
                        <label>Long Description</label>
                        <Input
                            name="longdescription"
                            value={addFields?.longdescription || ''}
                            type="textarea"
                            required
                            onChange={handleInputChange}
                        />
                        <label>Writer Name</label>
                        <Input
                            name="writerName"
                            value={addFields?.writerName}
                            type="text"
                            disabled
                            onChange={handleInputChange}
                        />
                        <label>Category</label>
                        <select name="category" className="form-control" value={addFields?.category || ''} onChange={handleInputChange} required>
                            <option value="" disabled>Select Category</option>
                            <option value="NUTRITION">NUTRITION</option>
                            <option value="TRAINING">TRAINING</option>
                            <option value="TRANSFORMATION">TRANSFORMATION</option>
                            <option value="WELLBEING">WELLBEING</option>
                            <option value="WELLNESS">WELLNESS</option>
                            <option value="NEWS">NEWS</option>
                        </select>

                        <label>Contributer</label>
                        <Input
                            name="contributer"
                            value={addFields?.contributer || ''}
                            type="text"
                            required
                            onChange={handleInputChange}
                        />
                        <Col lg={3}>
                            <label className="mt-3">Active</label>
                        </Col>
                        <Col lg={9}>
                            <Input
                                name="isActive"
                                className="ml-5 mt-3"
                                value={addFields?.isActive || ''}
                                type="checkbox"
                                required
                                onChange={handleInputChange}
                            />
                        </Col>
                        <label>
                            Upload Blog Image<i className="fa fa-asterisk text-danger" aria-hidden="true"></i>
                        </label>
                        <label className="overflow-hidden border border-dark profile-img-wrap" htmlFor="blogimage">
                            <label htmlFor="blogimage"><i className="fa fa-camera-retro" aria-hidden="true"></i></label>
                            <Input id="blogimage" name="blogimage" type="file" className="form-control" onChange={handleInputChange} hidden />
                        </label>
                        {getPreviewImages ?
                            <Col md={2} sm={2} lg={2} xl={2} className="p-2">
                                <div className="p-0 border border-dark position-relative" id="container-img">
                                    <img src={getPreviewImages} />
                                </div>
                            </Col>
                            :
                            <p>No blog image</p>
                        }
                    </Row>
                </div>
                <div className="modal-footer">
                    <Button block className="btn-round w-25 my-3 my-sm-5 mx-auto" color="danger" type="submit">
                        {!addFields?._id ? 'Add' : 'Update'}
                    </Button>
                </div>
            </Form >
        </div >
        // </Modal >
    )
}

export default AddBlogDetails;
