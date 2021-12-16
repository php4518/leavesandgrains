import React, { useState, useEffect } from "react";
import { Col, Modal, Button, Form, Input, Row } from "reactstrap";
import { postDishes, updateDishes, deleteDishImg, getDishes } from '../../redux/actions/dish';
import { useDispatch } from "react-redux";
import { getImageUrl } from "../../helpers/utils";

var dataForm = new FormData();

const AddDishDetails = ({ dish = false, toggleModal }) => {
    const dispatch = useDispatch();
    const [addFields, setAddFields] = useState([]);
    const [getPreviewImages, setPeviewImages] = useState([]);
    const [getImages, setGetImages] = useState([]);
    const [validationFields, setValidationFields] = useState({});
    const [formValues, setFormValues] = useState([])

    useEffect(() => {
        if (dish?._id) {
            setAddFields(dish);
            setFormValues(dish.nutritions);
            let getColImg = [];
            let getPreImg = [];
            for (var i = 0; i < dish?.images.length; i++) {
                getColImg.push(getImageUrl(dish?.images[i]));
                getPreImg.push(dish?.images[i]);
            }
            setGetImages(getPreImg);
            setPeviewImages(getColImg);
        }
    }, [dish]);

    useEffect(() => {
        dispatch(getDishes())
        setAddFields(dish);
    }, [])


    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { name: "", perServing: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

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
        if (e.target.name === "images") {
            let images = [];
            for (let i = 0; i < e.target.files.length; i++) {
                if (e.target.files[i].name.match(/\.(jpg|jpeg|png|tif|tiff|gif)$/)) {
                    images.push(URL.createObjectURL(e.target.files[i]));
                    const mergeImg = [...getPreviewImages, ...images];
                    setPeviewImages(mergeImg);
                    dataForm.append('images', e.target.files[i])
                }
                else {
                    return;
                }
            }
        } else if (e.target.name === "isActive") {
            setAddFields({ ...addFields, [e.target.name]: e.target.checked });
        } else {
            setAddFields({ ...addFields, [e.target.name]: e.target.value });
        }
    }

    const removeImageItem = (e) => {
        const previousItems = getPreviewImages.filter((item, i) => i !== e);
        setPeviewImages(previousItems);
        if (getImages.length !== 0) {
            const newItems = getImages.filter((item, i) => i !== e);
            setGetImages(newItems);
            dispatch(deleteDishImg(dish._id, e));
        } else {
            console.log("no images");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (validateInputs()) {

            if (getImages.length !== 0) {
                getImages.map((i) => {
                    dataForm.append('old_images', i)
                })
            }

            dataForm.set('title', addFields.title)
            dataForm.set('description', addFields.description)
            dataForm.set('servingWeight', addFields.servingWeight)
            dataForm.set('price', addFields.price)
            dataForm.set('category', addFields.category)
            dataForm.set('proteinType', addFields.proteinType)
            dataForm.set('instructions', addFields.instructions)
            dataForm.set('ingredients', addFields.ingredients)
            dataForm.set('contains', addFields.contains)
            dataForm.set('ingredientInstructions', addFields.ingredientInstructions)
            dataForm.set('calories', addFields.calories)
            dataForm.set('protein', addFields.protein)
            dataForm.set('carbs', addFields.carbs)
            dataForm.set('fats', addFields.fats)
            dataForm.set('nutritions', JSON.stringify(formValues))
            dataForm.set('isActive', addFields.isActive)

            if (!addFields?._id) {
                dispatch(postDishes(dataForm));
                toggleModal();
                dish = [];
                dispatch(getDishes())
            } else {
                dispatch(updateDishes(addFields._id, dataForm));
                toggleModal();
                dish = [];
                dispatch(getDishes())
            }
        }
    }

    if (!dish) return null

    return (
        // <Modal isOpen={!!dish} toggle={toggleModal} size="xl" className="dish-details">
        <div>
            <div className="modal-header modal-title">
                {!addFields?._id ?
                    `Add New Dish` :
                    `Update Dish Detail`
                }
                <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={() => { toggleModal(); dish = [] }}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <Form onSubmit={handleSubmit} style={{ display: "contents" }}>
                <div className="modal-body">
                    <Row>
                        <Col md={6}>
                            <label>Dish name</label>
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
                            <label>Serving Weight</label>
                            <Input
                                name="servingWeight"
                                value={addFields?.servingWeight || ''}
                                type="number"
                                required
                                onChange={handleInputChange}
                            />
                            <label>Price</label>
                            <Input
                                name="price"
                                value={addFields?.price || ''}
                                type="number"
                                required
                                onChange={handleInputChange}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                            <label>Category</label>
                            <select name="category" className="form-control" value={addFields?.category || ''} onChange={handleInputChange} required>
                                <option value="" disabled>Select Category</option>
                                <option value="MEALS">MEALS</option>
                                <option value="PLUS">PLUS</option>
                                <option value="BREAKFAST">BREAKFAST</option>
                                <option value="SNACKS">SNACKS</option>
                                <option value="DRINKS">DRINKS</option>
                            </select>
                            <label>Protein Type</label>
                            <select name="proteinType" className="form-control" value={addFields?.proteinType || ''} onChange={handleInputChange} required>
                                <option value="" disabled>Select Protein Type</option>
                                <option value="VEGETARIAN">VEGETARIAN</option>
                                <option value="LAMB">LAMB</option>
                                <option value="VEGAN">VEGAN</option>
                            </select>
                            <label>Ingredients</label>
                            <Input
                                name="ingredients"
                                value={addFields?.ingredients || ''}
                                type="text"
                                required
                                onChange={handleInputChange}
                            />
                            <Row>
                                <label>
                                    Upload Images<i className="fa fa-asterisk text-danger" aria-hidden="true"></i>
                                </label>
                                <label className="overflow-hidden border border-dark profile-img-wrap" htmlFor="images">
                                    <label htmlFor="images"><i className="fa fa-camera-retro" aria-hidden="true"></i></label>
                                    <Input multiple id="images" name="images" type="file" className="form-control" onChange={handleInputChange} hidden />
                                </label>
                            </Row>
                            <Row className="p-2">
                                {getPreviewImages?.length !== 0 ?
                                    getPreviewImages?.map((img, ind) =>
                                        <Col key={ind} md={2} sm={2} lg={2} xl={2} className="p-2">
                                            <div className="p-0 border border-dark position-relative" id="container-img">
                                                <img src={img} />
                                            </div>
                                            <i className="fa fa-times dlt-img-project rounded-circle" aria-hidden="true" height="20" width="20" onClick={() => removeImageItem(ind)} ></i>
                                        </Col>
                                    )
                                    :
                                    <p>No images for this project</p>
                                }
                            </Row>
                        </Col>
                        <Col md={6}>
                            <label>Instructions</label>
                            <Input
                                name="instructions"
                                value={addFields?.instructions || ''}
                                type="text"
                                required
                                onChange={handleInputChange}
                            />
                            <label>Contains</label>
                            <Input
                                name="contains"
                                value={addFields?.contains || ''}
                                type="text"
                                required
                                onChange={handleInputChange}
                            />
                            <label>Ingredient Instructions</label>
                            <Input
                                name="ingredientInstructions"
                                required
                                value={addFields?.ingredientInstructions || ''}
                                type="text"
                                onChange={handleInputChange}
                            />
                            <label>Calories</label>
                            <Input
                                name="calories"
                                required
                                value={addFields?.calories || ''}
                                type="number"
                                onChange={handleInputChange}
                            />
                            <label>Protein</label>
                            <Input
                                name="protein"
                                required
                                value={addFields?.protein || ''}
                                type="number"
                                onChange={handleInputChange}
                            />
                            <label>Carbs</label>
                            <Input
                                name="carbs"
                                value={addFields?.carbs || ''}
                                type="number"
                                required
                                onChange={handleInputChange}
                            />
                            <label>Fats</label>
                            <Input
                                name="fats"
                                value={addFields?.fats || ''}
                                type="number"
                                required
                                onChange={handleInputChange}
                            />
                            <div className="button-section mt-2">
                                <Button block className="btn-round" color="danger" type="button" onClick={() => addFormFields()}><i className="fa fa-plus" />Add Nutritions</Button>
                            </div>
                            <div style={{ overflowY: "auto", height: "15vh", overflowX: "hidden" }}>
                                {formValues.length !== "0" && formValues.map((element, index) => (
                                    <Row key={index}>
                                        <Col sm={6}>
                                            <label>{index + 1}) Name</label>
                                            <Input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} required />
                                        </Col>
                                        <Col sm={5}>
                                            <label>Per Serving</label>
                                            <Input type="number" name="perServing" value={element.perServing || ""} onChange={e => handleChange(index, e)} required />
                                        </Col>
                                        <Col sm={1} className="mt-4 p-0">
                                            {/* <button type="button" className="button remove" onClick={() => removeFormFields(index)}><i className="fa fa-trash" /></button> */}
                                            <span aria-hidden={true} onClick={() => removeFormFields(index)}><i className="fa fa-trash  fa-2x"></i></span>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                            <label className="mt-3">Active</label>
                            <Input
                                name="isActive"
                                className="ml-5 mt-3"
                                value={addFields?.isActive || ''}
                                type="checkbox"
                                required
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="modal-footer">
                    <Button block className="btn-round w-25 my-3 my-sm-5 mx-auto" color="danger" type="submit">
                        {!addFields?._id ? 'Add' : 'Update'}
                    </Button>
                </div>
            </Form>
        </div>
        // </Modal >
    )
}

export default AddDishDetails;
