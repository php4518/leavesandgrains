import React, {useEffect, useState} from "react";
import {Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Modal, Row, UncontrolledDropdown} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {getMeals} from 'redux/actions/dish';
import {addMealPlanToCart} from 'redux/actions/cart';
import MenuHeader from "../../components/header/menuHeader";
import {GENDER_TYPE, MEALS_PLANS, WORKOUTS_TYPE} from "../../helpers/constants";
import {allGainDetails, getImageUrl, getMealPlanTotal, getPrice} from "../../helpers/utils";
import DishDetails from "../../components/dish-details";
import Menu from "../menu";
import AppAlert from "../../components/alert";

const OrderHome = () => {
  const dispatch = useDispatch();
  const { dishStatus, meals } = useSelector(({ dish }) => {
    const { dishStatus, meals } = dish;
    return { dishStatus, meals };
  });

  const [showContent, setShowContent] = useState(false);
  const [dishDetail, showDishDetails] = useState(null);
  const [breakfast, setBreakfast] = useState(false);
  const [snacks, setSnacks] = useState(0)
  const [mealPlans, setMealPlans] = useState(null)
  const [mealIndex, setShowMenu] = useState(null)
  const [totalCost, setTotalCost] = useState(0)
  const [statics, setStatics] = useState({
    gender: null,
    workout: null,
    totalMeals: null
  });

  useEffect(() => {
    if (meals) {
      const defaultPlans = _.cloneDeep(meals); // destructuring to remove reference
      const plans = Object.entries(defaultPlans)
        .slice(0, statics.totalMeals.day) // get number of days for workout
        .map(meal => {

          meal[1] = meal[1].slice(0, statics.workout.times); // get number of meals per workout
          if (!breakfast) {
            meal[1][0]['mealObj'] = null; // remove breakfast, set static as we have static data for now
          }
          if (!snacks) {
            meal[1][2]['mealObj'] = null; // remove breakfast, set static as we have static data for now
            meal[1][4]['mealObj'] = null; // remove breakfast, set static as we have static data for now
          } else if (snacks === 1) {
            meal[1][4]['mealObj'] = null; // remove breakfast, set static as we have static data for now
          }
          return meal;
        });

      setMealPlans(Object.fromEntries(plans));
    }
  }, [meals, statics, breakfast, snacks]);

  useEffect(() => {
    if (mealPlans) {
      setTotalCost(getMealPlanTotal(mealPlans));
    }
  }, [mealPlans]);

  const onMealUpdate = (mealObj) => {
    const defaultMealPlans = _.cloneDeep(mealPlans)
    defaultMealPlans[mealIndex.key][mealIndex.index]['mealObj'] = mealObj;
    setMealPlans(defaultMealPlans);
    setShowMenu(false);
  };

  const handleRemoveMeal = (key, index) => {
    const defaultMealPlans = _.cloneDeep(mealPlans)
    defaultMealPlans[key][index]['mealObj'] = null;
    setMealPlans(defaultMealPlans);
  }

  const handlePlan = () => {
    dispatch(getMeals());
    window.scrollTo(0, 0);
    setShowContent(true);
  }

  const handleStatics = (key, value) => {
    let states = {...statics};
    states[key] = value;
    setStatics(states);
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addMealPlanToCart(mealPlans));
  }

  return (
    <div className="order-page">
      <MenuHeader/>
      <OrderStatics statics={statics} onPress={handleStatics} show={showContent} onCreatePlan={handlePlan}/>
      <div className="w-75 col-center">
        <OrderHeader show={showContent} breakfast={breakfast} snacks={snacks} setBreakfast={setBreakfast}
                     setSnacks={setSnacks}/>
        <MealsByDays
          mealPlans={mealPlans}
          showDetails={showDishDetails}
          removeMeal={handleRemoveMeal}
          updateMeal={setShowMenu}
          totalCost={totalCost}
          dishStatus={dishStatus}
        />
        <OrderFooter/>
      </div>
      <DishDetails dish={dishDetail} toggleModal={() => showDishDetails(null)}/>
      <Modal isOpen={!!mealIndex} toggle={() => setShowMenu(false)} size="xl" className="menu-selector">
        <div className="modal-body">
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setShowMenu(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
          <Menu hideHeader={true} onMealSelect={onMealUpdate}/>
        </div>
      </Modal>
      {!!mealPlans && <div className="btn-add-to-cart">
        <Button className="btn-round" color="info" type="button" onClick={handleAddToCart}>
          Add to cart | <span>{getPrice(totalCost)}</span>
        </Button>
      </div>}
    </div>
  );
}

const MealsByDays = ({dishStatus, mealPlans, showDetails, removeMeal, updateMeal}) => {
  if (!mealPlans) return <AppAlert alert={dishStatus} />
  return (
    Object.keys(mealPlans).map((key, index) => {
      return (
        <div key={index}>
          <h5 className="font-weight-bold border-bottom p-2">{key}</h5>
          <div className="meal-module-wrapper">
            {
              mealPlans[key].map((meal, i) => {
                return (<div key={i} className="card meal-module-block">
                  <div className="meal-image" onClick={() => showDetails(meal.mealObj)}>
                    {
                      (meal.mealObj && meal.mealObj.images && meal.mealObj.images.length) ?
                        <img src={getImageUrl(meal.mealObj.images[0])} alt=""/> :
                        <i className="fa fa-plus"/>
                    }
                  </div>
                  <div className="meal-data">
                    <div className="title">{meal.mealObj ? meal.mealObj.title : meal.defaultTitle}</div>
                    {meal.mealObj && <div className="gain-block">{allGainDetails(meal.mealObj)}</div>}
                    <div className="meal-data-footer">
                      <div className="price-block">
                        {meal.mealObj && getPrice(meal.mealObj.price)}
                      </div>
                      {(meal.mealObj && meal.allowNull) &&
                      <Button className="p-0 btn-sm" type="button" onClick={() => removeMeal(key, i)}>
                        <i className="fa fa-trash"/>
                      </Button>}
                      <Button
                        className="btn-just-icon ml-1"
                        color="info"
                        type="button"
                        onClick={() => updateMeal({key, index: i, mealType: meal.mealType})}
                      >
                        {meal.mealObj ? <i className="fa fa-refresh"/> : <i className="fa fa-plus"/>}
                      </Button>
                    </div>
                  </div>
                </div>)
              })
            }
          </div>
        </div>
      )
    })
  )
};

const OrderStatics = ({statics, onPress, show, onCreatePlan}) => {
  if (show) {
    return (
      <div className="bg-light text-center border-bottom">
        <Row className="col-center py-4 px-5">
          <Col lg="3" md="12" sm="12" className="col-center">
            <h4 className="font-weight-bold m-0">IT ALL STARTS HERE</h4>
          </Col>
          <Col lg="3" md="4" sm="12" className="my-3 my-md-1">
            <div className="description mb-3">What is your gender?</div>
            <UncontrolledDropdown>
              <DropdownToggle
                aria-expanded={false}
                aria-haspopup={true}
                color="danger"
                data-toggle="dropdown"
                id="dropdownMenuButton"
                caret
                className="w-75"
              >
                {statics.gender}
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="dropdownMenuButton"
                className="dropdown-info"
              >
                {
                  GENDER_TYPE.map((e, i) =>
                    <DropdownItem key={i} onClick={() => onPress('gender', e)}>{e}</DropdownItem>
                  )
                }
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
          <Col lg="3" md="4" sm="12" className="my-3 my-md-1">
            <div className="description mb-3">How often do you workout a week?</div>
            <UncontrolledDropdown>
              <DropdownToggle
                aria-expanded={false}
                aria-haspopup={true}
                color="danger"
                data-toggle="dropdown"
                id="dropdownMenuButton"
                caret
                className="w-75"
              >
                {statics.workout.title}
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="dropdownMenuButton"
                className="dropdown-info"
              >
                {
                  WORKOUTS_TYPE.map((e, i) =>
                    <DropdownItem key={i} onClick={() => onPress('workout', e)}>{e.title}</DropdownItem>
                  )
                }
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
          <Col lg="3" md="4" sm="12" className="my-3 my-md-1">
            <div className="description mb-3">How often do you workout a week?</div>
            <UncontrolledDropdown>
              <DropdownToggle
                aria-expanded={false}
                aria-haspopup={true}
                color="danger"
                data-toggle="dropdown"
                id="dropdownMenuButton"
                caret
                className="w-75"
              >
                {statics.totalMeals.day} Days
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="dropdownMenuButton"
                className="dropdown-info"
              >
                {
                  MEALS_PLANS.map((e, i) =>
                    <DropdownItem key={i} onClick={() => onPress('totalMeals', e)}>{e.day} Days</DropdownItem>
                  )
                }
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        </Row>
      </div>
    )
  }
  return (
    <Row>
      <Col className="col-center text-center" sm="12" md="8" lg="6">
        <h2 className="font-weight-bold">IT ALL STARTS HERE</h2>
        <div className="description mt-2 mb-4">
          Select the options below that match you and your exercise schedule.
        </div>
        <div className="my-5">
          <div className="description mb-3">What is your gender?</div>
          <Row className="w-75 col-center">
            {
              GENDER_TYPE.map((e, i) =>
                <Col key={i} md="6" sm="6" className="col-center text-center mb-1" onClick={() => onPress('gender', e)}>
                  <div
                    className={`py-3 font-weight-bold border border-secondary rounded
                    ${statics.gender === e ? 'bg-secondary txt-white' : ''}`}
                  >
                    {e}
                  </div>
                </Col>
              )
            }
          </Row>
        </div>
        <div className="my-5">
          <div className="description mb-3">How often do you workout a week?</div>
          <Row className="w-75 col-center">
            {
              WORKOUTS_TYPE.map((e, i) =>
                <Col key={i} md="6" sm="6" className="col-center text-center mb-1"
                     onClick={() => onPress('workout', e)}>
                  <div
                    className={`py-3 font-weight-bold border border-secondary rounded
                    ${(statics.workout && statics.workout.title === e.title) ? 'bg-secondary txt-white' : ''}`}
                  >
                    {e.title}
                  </div>
                </Col>
              )
            }
          </Row>
        </div>
        {
          statics.gender && statics.workout ?
            <div className="my-5">
              <div className="description mb-3">How many meals would you like?</div>
              <Row className="w-75 col-center">
                {
                  MEALS_PLANS.map((e, i) =>
                    <Col key={i} md="4" sm="4" className="col-center text-center mb-1"
                         onClick={() => onPress('totalMeals', e)}>
                      <div
                        className={`py-3 font-weight-bold border border-secondary rounded
                      ${(statics.totalMeals && statics.totalMeals.day === e.day) ? 'bg-secondary txt-white' : ''}`}
                      >
                        <div>{e.day} <span className="font-weight-normal">Days</span></div>
                        <div>{e.day * statics.workout.times} Meals</div>
                      </div>
                    </Col>
                  )
                }
              </Row>
            </div> : null
        }
        {
          statics.gender && statics.workout && statics.totalMeals ?
            <Button className="btn-round w-75" color="danger" type="button" onClick={onCreatePlan}>
              create my plan
            </Button> : null
        }
      </Col>
    </Row>
  )
}

const OrderHeader = ({show, breakfast, setBreakfast, snacks, setSnacks}) => {
  if (!show) return null
  return (
    <div className="mb-5">
      <div className="description w-50 w-md-100">
        <h4 className="font-weight-bold mt-5 mb-2">YOUR PLAN</h4>
        <div>View your personalised meal plan below. This plan has been selected based on your exercise frequency to
          help you reach your fitness goal. Simply review the meals and swap any to create your dedicated meal plan for
          the week.
        </div>
        <h4 className="font-weight-bold mt-5 mb-2">Breakfast & Snacks</h4>
        <div>Hit your daily macros with our healthy breakfast and snack options!</div>
      </div>
      <div className="font-weight-bold mt-4 mb-3">Select from the following options to quickly fill your meal plan</div>
      <Row>
        <Col>
          <div className={`${breakfast ? 'active' : ''} meals-button`} onClick={() => setBreakfast(!breakfast)}>
            Add Breakfast meals
          </div>
        </Col>
        <Col>
          <div
            className={`${snacks === 1 ? 'active' : ''} meals-button`}
            onClick={(e) => setSnacks(snacks === 1 ? 0 : 1)}
          >
            +1 Snack or Drink per day
          </div>
        </Col>
        <Col>
          <div
            className={`${snacks === 2 ? 'active' : ''} meals-button`}
            onClick={(e) => setSnacks(snacks === 2 ? 0 : 2)}
          >
            +2 Snack or Drink per day
          </div>
        </Col>
      </Row>
    </div>
  )
}

const OrderFooter = () => (
  <div className="description my-5">
    *Disclaimer: While every effort is made to try and eliminate allergen cross combination, our meals are prepare in a
    commercial kitchen. We therefore cannot 100% guarantee any products sold on our website are completely free from any
    allergen such as eggs, fish, milk, peanuts, sesame, crustaceans, soy, nuts, tree nuts, gluten, lupin and sulphites.
    <br/>
    <br/>
    +All our vegan meals have been produced in a kitchen that also makes meals containing meat, fish, crustaceans, eggs,
    milk and other allergens, and may not be suitable for those with allergies.
    <br/>
    <br/>
    <div className="font-weight-lighter">
      Our performance meal plans have been produced with the perfect macronutrient balance of protein, fats and
      carbohydrates to aid a high performance or endurance lifestyle. Fuel your body with the right amount of food to
      burn energy during intense workouts as well as repair muscle development post workouts. Spend more time cycling,
      running or enjoying your endurance lifestyle and leave the meal prep to the experts. Get your performance eating
      meal plan delivered straight to your door.
    </div>
  </div>
)

export default OrderHome;
