import React, { useState, useEffect } from "react";
import { Col, Modal, Button, Form, Input, Row } from "reactstrap";
import { postDishes, updateDishes, deleteDishes, deleteDisheImg } from 'redux/actions/dish';
import { useDispatch } from "react-redux";
import { getImageUrl } from "../../helpers/utils";

const AddDishDetails = ({ dish = false, toggleModal }) => {
    const dispatch = useDispatch();
    const [addFields, setAddFields] = useState([]);

    useEffect(() => {
        setAddFields(dish);
    }, [dish]);

    const [validationFields, setValidationFields] = useState({});

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
            setAddFields({ ...addFields, [e.target.name]: Array.from(e.target.files)});
        } else {
            setAddFields({ ...addFields, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (validateInputs()) {
            if (!addFields?._id) {
                dispatch(postDishes(addFields));
            } else {
                // delete addFields.confirmPassword;
                // delete addFields.confirmPassword;
                // delete addFields.confirmPassword;
                dispatch(updateDishes(addFields));
            }
        }
    }

    if (!dish) return null

    return (
        <Modal isOpen={!!dish} toggle={toggleModal} size="xl" className="dish-details">
            <div className="modal-header modal-title">
                {!addFields?._id ?
                    `Add New Dish` :
                    `Update Dish Detail`
                }
                <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={() => { toggleModal(); dish = []; }}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <Form onSubmit={handleSubmit}>
                <div className="modal-body">
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
                        <select name="category" className="form-control" value={addFields?.category || ''} onChange={handleInputChange}>
                            <option value="" disabled>Select Category</option>
                            <option value="MEALS">MEALS</option>
                            <option value="PLUS">PLUS</option>
                            <option value="BREAKFAST">BREAKFAST</option>
                            <option value="SNACKS">SNACKS</option>
                            <option value="DRINKS">DRINKS</option>
                        </select>
                        <label>Protein Type</label>
                        <select name="proteinType" className="form-control" value={addFields?.proteinType || ''} onChange={handleInputChange}>
                            <option value="" disabled>Select Protein Type</option>
                            <option value="VEGETARIAN">VEGETARIAN</option>
                            <option value="LAMB">LAMB</option>
                            <option value="VEGAN">VEGAN</option>
                        </select>
                        <label>Instructions</label>
                        <Input
                            name="instructions"
                            value={addFields?.instructions || ''}
                            type="text"
                            onChange={handleInputChange}
                        />
                        <Row>
                            <label>
                                Upload Images<i className="fa fa-asterisk text-danger" aria-hidden="true"></i>
                            </label>
                            <div className="overflow-hidden border border-dark profile-img-wrap">
                                <label htmlFor="images"><i className="fa fa-camera-retro" aria-hidden="true"></i></label>
                                <Input multiple id="images" name="images" type="file" className="form-control" onChange={handleInputChange} hidden />
                            </div>
                        </Row>
                        <Row className="p-2">
                            {addFields?.images?.length !== 0 ?
                                addFields?.images?.map((img, ind) =>
                                    <Col key={ind} md={2} sm={2} lg={2} xl={2} className="p-2">
                                        <div className="p-0 border border-dark position-relative" id="container-img">
                                            <img src={getImageUrl(img)} />
                                            {/* <div className="p-2">
                                                <span><center>{img.replace(/^.*[\\\/]/, '')}</center></span>
                                            </div> */}
                                        </div>
                                        <i className="fa fa-times dlt-img-project rounded-circle" aria-hidden="true" height="20" width="20" onClick={() => this.removeImageItem(ind)} ></i>
                                    </Col>
                                )
                                :
                                <p>No images for this project</p>
                            }
                        </Row>
                    </Col>
                    <Col md={6}>
                        <label>Ingredients</label>
                        <Input
                            name="ingredients"
                            value={addFields?.ingredients || ''}
                            type="text"
                            onChange={handleInputChange}
                        />
                        <label>Contains</label>
                        <Input
                            name="contains"
                            value={addFields?.contains || ''}
                            type="text"
                            onChange={handleInputChange}
                        />
                        <label>Ingredient Instructions</label>
                        <Input
                            name="ingredientInstructions"
                            value={addFields?.ingredientInstructions || ''}
                            type="text"
                            onChange={handleInputChange}
                        />
                        <label>Calories</label>
                        <Input
                            name="calories"
                            value={addFields?.calories || ''}
                            type="number"
                            onChange={handleInputChange}
                        />
                        <label>Protein</label>
                        <Input
                            name="protein"
                            value={addFields?.protein || ''}
                            type="number"
                            onChange={handleInputChange}
                        />
                        <label>Carbs</label>
                        <Input
                            name="carbs"
                            value={addFields?.carbs || ''}
                            type="number"
                            onChange={handleInputChange}
                        />
                        <label>Fats</label>
                        <Input
                            name="fats"
                            value={addFields?.fats || ''}
                            type="number"
                            onChange={handleInputChange}
                        />
                        <label>Nutritions</label>
                        <Input
                            name="nutritions"
                            value={addFields?.nutritions || ''}
                            type="text"
                            onChange={handleInputChange}
                        />
                        <label>Active</label>
                        <Input
                            name="isActive"
                            value={addFields?.isActive || ''}
                            type="text"
                            onChange={handleInputChange}
                        />
                    </Col>
                </div>
                <div className="modal-footer">
                    <Button block className="btn-round w-25 my-3 my-sm-5 mx-auto" color="danger" type="submit">
                        {!addFields?._id ? 'Add' : 'Update'}
                    </Button>
                </div>
            </Form>
        </Modal >
    )
}

export default AddDishDetails;
