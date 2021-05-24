import React, {useEffect, useState} from "react";
import moment from 'moment'
import {Button, Col, Container, Row} from "reactstrap";
import MenuHeader from "../../components/header/menuHeader";
import AddressModule from "../../components/address-module";
import {setMealPlans, setIndividualMeals, removeIndividualMealFromCart, removeMealPlanFromCart} from "../../redux/actions/cart";
import {IndividualMealCard, MealPlanCard} from "../../components/cart-items";
import {formatAddress, getCartTotal, getPrice} from "../../helpers/utils";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const { currentUser, mealPlans, individualMeals } = useSelector(({ user, cart }) => {
    let { currentUser } = user;
    let { mealPlans, individualMeals } = cart;
    return { currentUser, mealPlans, individualMeals }
  });

  const [addressModule, showAddressModule] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const history = useHistory();
  const cartTotal = getCartTotal({ mealPlans, individualMeals });

  useEffect(() => {
    mealPlans.forEach((_, index) => handleMealPlanDateChange(index));
    Object.keys(individualMeals).forEach(k => handleIndividualMealDateChange(k));
  }, []);

  const confirmOrder = (e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push('/payment', { address: selectedAddress, amount: cartTotal });
  };

  const handleMealPlanDateChange = (index, date = moment().add(1, 'day')) => {
    mealPlans[index].start = date;
    dispatch(setMealPlans(mealPlans));
  };

  const handleIndividualMealDateChange = (id, date = moment()) => {
    individualMeals[id].deliveryDate = date;
    dispatch(setIndividualMeals(individualMeals));
  };

  const isEmpty = !mealPlans.length && !Object.keys(individualMeals).length;
  return (
    <div className="cart-page">
      <MenuHeader/>
      <Container className="cart-container">
        <Row>
          <Col md={8} className="order-2 order-md-1">
            <h2 className="font-weight-bold mb-3">YOUR CART</h2>
            {
              isEmpty &&
              <>
                <h5 className="mb-3">Your cart is empty</h5>
                <Button className="btn-round" color="info" type="button" href="/menu">
                  order now
                </Button>
              </>
            }
            <div className="mb-5">
              {mealPlans.length ? <h3 className="border-bottom">Custom Meal Plans</h3> : null}
              {
                mealPlans.map((plan, index) =>
                  <MealPlanCard
                    plan={plan}
                    key={index}
                    index={index}
                    onItemRemove={(index) => dispatch(removeMealPlanFromCart(index))}
                    onDateChange={handleMealPlanDateChange}
                  />
                )
              }
            </div>
            <div>
              {Object.keys(individualMeals).length ?
                <h3 className="border-bottom">Individual Meals</h3> : null}
              {
                Object.values(individualMeals).map((item, index) =>
                  <IndividualMealCard
                    item={item}
                    key={index}
                    onItemRemove={(id) => dispatch(removeIndividualMealFromCart(id))}
                    onDateChange={handleIndividualMealDateChange}
                  />
                )
              }
            </div>
          </Col>
          {
            !isEmpty &&
            <Col md={4} className="order-1 order-md-2">
              <div className="card my-5 p-3 rounded">
                <h3>Order Summary</h3>
                <div className="divider mb-3 mx-2"/>
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Subtotal</h5>
                  <h5>{getPrice(cartTotal)}</h5>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Shipping</h5>
                  <h5>{getPrice(0)}</h5>
                </div>
                <div className="divider mb-3 mx-2"/>
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Total</h5>
                  <h5 className="font-weight-bold">{getPrice(cartTotal)}</h5>
                </div>

                {currentUser ?
                <Button
                  className="btn-round my-3"
                  color="success"
                  type="button"
                  onClick={(e) => selectedAddress ? confirmOrder(e) : showAddressModule(true)}
                >
                  {selectedAddress ? 'Confirm order' : 'Checkout'}
                </Button> :
                <Button
                  className="btn-round my-3"
                  color="success"
                  type="button"
                  href="/sign-in"
                >
                  Sign in to order
                </Button>
                }
                {
                  selectedAddress ?
                  <>
                    <h5 className="font-weight-bold">
                      Delivery Location: <span className="change" onClick={() => showAddressModule(true)}>Change</span>
                    </h5>
                    <div className="font-weight-bold">{selectedAddress.name}</div>
                    <div>{formatAddress(selectedAddress)}</div>
                  </> : null
                }
              </div>
            </Col>}
        </Row>
      </Container>
      <AddressModule
        show={!!addressModule}
        toggleModal={() => showAddressModule(false)}
        selectedAddress={selectedAddress}
        onSelectAddress={setSelectedAddress}
      />
    </div>
  );
}

export default Cart;
