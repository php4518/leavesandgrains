import React, { useState, useEffect, useRef } from "react";
import { Col, Modal, Button, Form, Input, Row } from "reactstrap";
import { postBlogs, updateBlogs, getBlogs } from '../../redux/actions/blog';
import { useDispatch } from "react-redux";
import { getImageUrl } from "../../helpers/utils";
import { Editor } from '@tinymce/tinymce-react';
import { BLOG_TYPES } from "../../helpers/constants";

var dataForm = new FormData();

const AddBlogDetails = ({ blog = false, toggleModal }) => {
    const dispatch = useDispatch();
    const [getPreviewImages, setPeviewImages] = useState([]);
    const [getImages, setGetImages] = useState({});
    const [validationFields, setValidationFields] = useState({});
    const [initTinyValue, setInitTinyValue] = useState(undefined)

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
            setGetImages(blog?.blogImage);
            setPeviewImages(getImageUrl(blog?.blogImage));
        }
    }, [blog]);

    useEffect(() => {
        // a real application might do a fetch request here to get the content

    }, []);

    useEffect(() => {
        dispatch(getBlogs())
        setAddFields(blog, defaultFields);
        setTimeout(() => setInitTinyValue(blog.longDescription), 500);
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
        if (e.target.name === "blogImage") {
            if (e.target.files[0].name.match(/\.(jpg|jpeg|png|tif|tiff|gif)$/)) {
                var blogImage = URL.createObjectURL(e.target.files[0]);
                setPeviewImages(blogImage);
                dataForm.set('blogImage', e.target.files[0])
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

    const handleTinyChange = (e) => {
        setAddFields({ ...addFields, ["longDescription"]: e });
    }
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (validateInputs()) {
            dataForm.set('title', addFields.title)
            dataForm.set('description', addFields.description)
            dataForm.set('longDescription', addFields.longDescription)
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
        <div>
            <div className="modal-header modal-title">
                {!addFields?._id ?
                    `Add New Blog` :
                    `Update Blog Detail`
                }
                <i className="fa fa-times float-right close" aria-hidden="true" onClick={() => { toggleModal(); blog = [] }}></i>
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
                        <div>
                            <label>Long Description</label>
                            <Editor
                                onEditorChange={handleTinyChange}
                                required
                                initialValue={initTinyValue}
                                placeholder="Enter long description"
                                init={{
                                    height: 500,
                                    width: 1050,
                                    menubar: true,
                                    mobile: {
                                        menubar: true,
                                        width: 500,
                                        plugins: ['autosave', 'lists', 'autolink'],
                                        toolbar: ['undo', 'bold', 'italic', 'styleselect']
                                    },
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount',
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help | link image',
                                    image_title: true,
                                    selector: 'textarea#file-picker',
                                    automatic_uploads: true,
                                    file_picker_types: 'image',
                                    /* and here's our custom image picker*/
                                    file_picker_callback: function (cb, value, meta) {
                                        var input = document.createElement('input');
                                        input.setAttribute('type', 'file');
                                        input.setAttribute('accept', 'image/*');
                                        input.onchange = function () {
                                            var file = this.files[0];

                                            var reader = new FileReader();
                                            reader.onload = function () {
                                                /*
                                                  Note: Now we need to register the blob in TinyMCEs image blob
                                                  registry. In the next release this part hopefully won't be
                                                  necessary, as we are looking to handle it internally.
                                                */
                                                var id = 'blobid' + (new Date()).getTime();
                                                var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                                                var base64 = reader.result.split(',')[1];
                                                var blobInfo = blobCache.create(id, file, base64);
                                                blobCache.add(blobInfo);

                                                /* call the callback and populate the Title field with the file name */
                                                cb(blobInfo.blobUri(), { title: file.name });
                                            };
                                            reader.readAsDataURL(file);
                                        };

                                        input.click();
                                    },

                                    content_style: 'body {font - family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </div>
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
                            {BLOG_TYPES.map((type, i) =>
                                <option key={i} value={type}>{type}</option>
                            )}
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
                                defaultChecked={addFields?.isActive}
                                required
                                onChange={handleInputChange}
                            />
                        </Col>
                        <label>
                            Upload Blog Image<i className="fa fa-asterisk text-danger" aria-hidden="true"></i>
                        </label>
                        <label className="overflow-hidden border border-dark profile-img-wrap" htmlFor="blogImage">
                            <label htmlFor="blogImage"><i className="fa fa-camera-retro" aria-hidden="true"></i></label>
                            <Input id="blogImage" name="blogImage" type="file" className="form-control" onChange={handleInputChange} hidden />
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
