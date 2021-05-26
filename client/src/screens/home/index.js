import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDishes} from 'redux/actions/dish';
import Header from "../../components/header/homeHeader";
import {Button, Col, Container, Row} from "reactstrap";
import DishCard from "../../components/dish-card";
import {useHistory} from "react-router-dom";
import AppAlert from "../../components/alert";

const Home = () => {
  const dispatch = useDispatch();
  const {dishes, dishStatus} = useSelector(({dish: {dishes, dishStatus}}) => ({dishes, dishStatus}));

  useEffect(() => dispatch(getDishes()), []); // eslint-disable-line react-hooks/exhaustive-deps

  const history = useHistory();
  const goto = (page) => history.push(`/${page}`);

  return (
    <div>
      <Header/>
      <div className="title text-center">
        <h2 className="font-weight-bold mb-5">Our Meals</h2>
        <Container>
          <AppAlert alert={dishStatus}/>
          <Row className="justify-content-center">
            {
              dishes.slice(0, 4).map(item =>
                <Col key={`item-card-${item._id}`} md="3" sm="6">
                  <DishCard dish={item} showDetails={false}/>
                </Col>
              )
            }
          </Row>
          <Col className="mx-auto mt-5" sm="5">
            <Button className="btn-round" size="lg" color="danger" onClick={() => goto('menu')}>
              Check all items
              <i className="fa fa-arrow-right ml-2"/>
            </Button>
          </Col>
        </Container>
      </div>
    </div>
  );
}

export default Home;
