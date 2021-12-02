import React from "react";
import { Button, Col, Row } from "reactstrap";
import { allGainDetails, getImageUrl, getPrice, getServingWeight } from "../../helpers/utils";

const DishCard = ({
  dish, showDetails = true, onClick = () => {
  }, onEditClick = () => {
  }, addItem = () => {
  }, quantity = 0
}) => {
  const onAddItem = (e, quantity) => {
    e.stopPropagation();
    e.preventDefault();
    if (quantity < 0 || quantity > 20) {
      return;
    }
    dish.quantity = quantity;
    addItem(dish);
  };

  return (
    <div className="card dish-card" onClick={() => onClick(dish)}>
      <div className="position-relative">
        <img alt="..." className="img-rounded img-responsive"
          src={getImageUrl(dish.images[0] || '')}
        />
        <div className="card-weight">
          <div className="weight-text">{getServingWeight(dish.servingWeight)}</div>
        </div>
      </div>
      <div className="px-3 pb-3">
        <h4 className="card-title truncate-tail-2">{dish.title}</h4>
        {showDetails &&
          <div>
            <Row className="my-3">
              <Col><p className="card-pricing">{getPrice(dish.price)}</p></Col>
              <Col className="d-flex">{allGainDetails(dish)}</Col>
            </Row>
            <div>
              {
                quantity ?
                  <div className="already-added">
                    <Button
                      className="btn-just-icon"
                      color="info"
                      type="button"
                      onClick={(e) => onAddItem(e, quantity - 1)}
                    >
                      <i className="fa fa-minus" />
                    </Button>
                    {quantity}
                    <Button
                      className="btn-just-icon"
                      color="info"
                      type="button"
                      onClick={(e) => onAddItem(e, quantity + 1)}
                    >
                      <i className="fa fa-plus" />
                    </Button>
                  </div> :
                  <Button className="btn-round w-100" color="info" type="button" onClick={(e) => onAddItem(e, 1)}>
                    add item
                    <i className="fa fa-plus ml-2" />
                  </Button>
              }
              <Row>
                <Button
                  aria-label="Edit"
                  className="edit"
                  type="button"
                  onClick={() => onEditClick(dish)}
                >
                  <span aria-hidden={true}><i className="fa fa-pencil" aria-hidden="true"></i></span>
                </Button>
                <Button
                  aria-label="Close"
                  className="close"
                  type="button"
                >
                  <span aria-hidden={true}><i className="fa fa-trash" aria-hidden="true"></i></span>
                </Button>
              </Row>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default DishCard;
