import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getDishes } from 'redux/actions/dish';
import { addIndividualMealToCart } from 'redux/actions/cart';
import DishCard from "../../components/dish-card";
import DishDetails from "../../components/dish-details";
import AddDishDetails from "../../components/add-dish-details";
import MenuHeader from "../../components/header/menuHeader";
import { CALORIES_TYPES, CARBS_TYPES, FAT_TYPES, MEAL_TYPES, PROTEIN_TYPES, SORT_TYPES } from "../../helpers/constants";
import AppAlert from "../../components/alert";

const defaultFilters = {
  categories: [],
  proteins: [],
  carbs: null,
  calories: null,
  fats: null,
  sort: null,
};

const Menu = (props) => {
  const dispatch = useDispatch();
  const { allDishes, dishStatus, individualMeals } = useSelector(({ dish, cart }) => ({
    allDishes: dish.dishes,
    dishStatus: dish.dishStatus,
    individualMeals: cart.individualMeals
  }));

  const [dishes, setDishes] = useState([]);
  const [dishDetail, showDishDetails] = useState(null);
  const [addDishDetail, showAddDishDetails] = useState(null);
  const [editDishDetail, showEditDishDetails] = useState(null);
  const [deleteDishDetail, showDeleteDishDetails] = useState(null);
  const [filters, setFilters] = useState(defaultFilters);
  useEffect(() => dispatch(getDishes()), []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => setDishes(allDishes), [allDishes]); // eslint-disable-line react-hooks/exhaustive-deps


  const filterDishes = (filterObj) => {
    let currentDishes = [...allDishes];
    currentDishes = currentDishes.filter(dish => {
      let categoriesFlag = true;
      let proteinsFlag = true;
      let caloriesFlag = true;
      let carbsFlag = true;
      let fatsFlag = true;
      if (filterObj.categories.length) {
        categoriesFlag = filterObj.categories.includes(dish.category)
      }
      if (filterObj.proteins.length) {
        proteinsFlag = filterObj.proteins.includes(dish.proteinType)
      }
      if (filterObj.calories) {
        if (filterObj.calories === "< 200g") {
          caloriesFlag = dish.calories < 200
        } else if (filterObj.calories === "> 400g") {
          caloriesFlag = dish.calories > 400
        } else {
          caloriesFlag = dish.calories === 200 || dish.calories === 400 || (dish.calories > 200 && dish.calories < 400)
        }
      }
      if (filterObj.carbs) {
        if (filterObj.carbs === "< 20g") {
          carbsFlag = dish.carbs < 20
        } else if (filterObj.carbs === "> 40g") {
          carbsFlag = dish.carbs > 40
        } else {
          carbsFlag = dish.carbs === 20 || dish.carbs === 40 || (dish.carbs > 20 && dish.carbs < 40)
        }
      }
      if (filterObj.fats) {
        if (filterObj.fats === "< 20g") {
          fatsFlag = dish.fats < 20
        } else if (filterObj.fats === "> 40g") {
          fatsFlag = dish.fats > 40
        } else {
          fatsFlag = dish.fats === 20 || dish.fats === 40 || (dish.fats > 20 && dish.carbs < 40)
        }
      }
      return categoriesFlag && proteinsFlag && caloriesFlag && carbsFlag && fatsFlag;
    })
    if (filterObj.sort) {
      if (filterObj.sort === "NEW") {
        currentDishes = _.orderBy(currentDishes, ['createdAt'], ['desc']);
      } else if (filterObj.sort === "Name A-Z") {
        currentDishes = _.sortBy(currentDishes, 'title');
      } else {
        currentDishes = _.sortBy(currentDishes, 'calories');
      }
    }
    setDishes(currentDishes);
  };

  const updateFilters = (e) => {
    let key = e.target.name;
    let value = e.target.labels[0].textContent.trim();
    let currentValues;
    if (e.target.type === "checkbox") {
      currentValues = [...filters[key]];
      if (e.target.checked) {
        currentValues.push(value);
      } else {
        currentValues.splice(currentValues.indexOf(value), 1);
      }
    } else {
      currentValues = value;
    }
    const updatedFilters = {
      ...filters,
      [key]: currentValues,
    };
    setFilters(updatedFilters);
    filterDishes(updatedFilters);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    filterDishes(defaultFilters);
  };

  const handleAddItem = (item) => {
    if (props.onMealSelect) {
      props.onMealSelect(item)
    } else {
      dispatch(addIndividualMealToCart(item));
    }
  };

  return (
    <div className="menu-page">
      {!props.hideHeader && <MenuHeader />}
      <Row className="mb-5 mx-2">
        <Col md="3">
          <div className="menu-page-filter">
            <div className="ml-auto">
              <Button
                className="btn-link ml-1"
                size="sm"
                color="default"
                type="button"
                onClick={clearFilters}
              >
                <div className="clear-all">clear all</div>
              </Button>
            </div>
            <Row>
              <Col md="12" sm="3" xs="6">
                <div className="title mt-0">
                  <h3>Category</h3>
                </div>
                <Row>
                  {
                    MEAL_TYPES.map((type, i) =>
                      <Col md="6" key={i}>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="categories"
                              checked={filters.categories.includes(type)}
                              onChange={updateFilters}
                            />
                            {type} <span className="form-check-sign" />
                          </Label>
                        </FormGroup>
                      </Col>
                    )
                  }
                </Row>
              </Col>
              <Col md="12" sm="3" xs="6">
                <div className="title">
                  <h3>Protein</h3>
                </div>
                <Row>
                  {
                    PROTEIN_TYPES.map((type, i) =>
                      <Col md="6" key={i}>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              name="proteins"
                              checked={filters.proteins.includes(type)}
                              onChange={updateFilters}
                            />
                            {type} <span className="form-check-sign" />
                          </Label>
                        </FormGroup>
                      </Col>
                    )
                  }
                </Row>
              </Col>
              <Col md="12" sm="3" xs="6">
                <FormGroup>
                  <div className="title">
                    <h3>Calories</h3>
                  </div>
                  <Row className="m-0">
                    {
                      CALORIES_TYPES.map((type, i) =>
                        <Col md="4" className="pl-0 pr-0" key={i}>
                          <div className="form-check-radio">
                            <Label check>
                              <Input
                                id="calories"
                                name="calories"
                                type="radio"
                                checked={filters.calories === type}
                                onChange={updateFilters}
                              />
                              {type} <span className="form-check-sign" />
                            </Label>
                          </div>
                        </Col>
                      )
                    }
                  </Row>
                </FormGroup>
              </Col>
              <Col md="12" sm="3" xs="6">
                <FormGroup>
                  <div className="title">
                    <h3>Carbs</h3>
                  </div>
                  <Row className="m-0">
                    {
                      CARBS_TYPES.map((type, i) =>
                        <Col md="4" className="pl-0 pr-0" key={i}>
                          <div className="form-check-radio">
                            <Label check>
                              <Input
                                id="carbs"
                                name="carbs"
                                type="radio"
                                checked={filters.carbs === type}
                                onChange={updateFilters}
                              />
                              {type} <span className="form-check-sign" />
                            </Label>
                          </div>
                        </Col>
                      )
                    }
                  </Row>
                </FormGroup>
              </Col>
              <Col md="12" sm="3" xs="6">
                <FormGroup>
                  <div className="title">
                    <h3>Fats</h3>
                  </div>
                  <Row className="m-0">
                    {
                      FAT_TYPES.map((type, i) =>
                        <Col md="4" className="pl-0 pr-0" key={i}>
                          <div className="form-check-radio">
                            <Label check>
                              <Input
                                id="fats"
                                name="fats"
                                type="radio"
                                checked={filters.fats === type}
                                onChange={updateFilters}
                              />
                              {type} <span className="form-check-sign" />
                            </Label>
                          </div>
                        </Col>
                      )
                    }
                  </Row>
                </FormGroup>
              </Col>
              <Col md="12" sm="3" xs="6">
                <FormGroup>
                  <div className="title">
                    <h3>Sort</h3>
                  </div>
                  {
                    SORT_TYPES.map((type, i) =>
                      <div className="form-check-radio" key={i}>
                        <Label check>
                          <Input
                            id="sort"
                            name="sort"
                            type="radio"
                            checked={filters.sort === type}
                            onChange={updateFilters}
                          />
                          {type} <span className="form-check-sign" />
                        </Label>
                      </div>
                    )
                  }
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md="9">
          <div className="title">
            <h2 className="font-weight-bold">MEALS
              <Button className="btn-info float-right" color="info" onClick={showAddDishDetails}>
                Add new dish
              </Button>
            </h2>
            <div className="description mt-2 mb-4">Enjoy our range of 50+ high-protein meals crafted by our Chef and
              Nutritionist. Nourishing and packed with flavour.
            </div>
          </div>
          <AppAlert alert={dishStatus} />
          <Row>
            {
              (!dishes.length) ? <Col className="no-data-available">No meals available</Col> :
                dishes.map((item, index) =>
                  <Col key={index} lg="3" md="6" sm="6">
                    <DishCard dish={item} onClick={showDishDetails} onEditClick={showEditDishDetails} addItem={handleAddItem}
                      quantity={individualMeals[item._id]?.quantity} />
                  </Col>
                )
            }
          </Row>
        </Col>
      </Row>
      <DishDetails dish={dishDetail} toggleModal={() => showDishDetails(null)} />
      {/* <AddDishDetails dish={editDishDetail} toggleModal={() => showEditDishDetails(null)} /> */}
      {editDishDetail && editDishDetail != '' ?
        <AddDishDetails dish={editDishDetail} toggleModal={() => showEditDishDetails(null)} />
        :
        <AddDishDetails dish={addDishDetail} toggleModal={() => showAddDishDetails(null)} />
      }
    </div>
  );
}

export default Menu;
