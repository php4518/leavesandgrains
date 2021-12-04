import React from "react";
import { Button, Col, Row } from "reactstrap";
import { allGainDetails, getImageUrl, getPrice, getServingWeight } from "../../helpers/utils";

const DishCard = ({
  dish, showDetails = true, onClick = () => {
  }, onEditClick = () => {
  }, onDeleteClick = () => {
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


  const userDetail = JSON.parse(localStorage.getItem("persist:user"));
  const userRole = JSON.parse(userDetail.currentUser);

  return (
    <div className="card">
      <div className="dish-card dish-container">
        <img alt="..." className="img-rounded img-responsive image"
          src={getImageUrl(dish.images[0] || '')}
        />
        <div className="card-weight">
          <div className="weight-text">{getServingWeight(dish.servingWeight)}</div>
        </div>
        {userRole.role === "ADMIN" ?
          <Row className="middle">
            <Button
              aria-label="Edit"
              className="edit text"
              type="button"
              onClick={() => onEditClick(dish)}
            >
              <span aria-hidden={true}><i className="fa fa-pencil" aria-hidden="true"></i></span>
            </Button>
            <Button
              aria-label="Delete"
              className="delete text"
              type="button"
              onClick={() => onDeleteClick(dish)}
            >
              <span aria-hidden={true}><i className="fa fa-trash" aria-hidden="true"></i></span>
            </Button>
          </Row>
          : null}
      </div>

      <div className="px-3 pb-3" onClick={() => onClick(dish)}>
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
                      className="btn-just-icon float-left"
                      color="info"
                      type="button"
                      onClick={(e) => onAddItem(e, quantity - 1)}
                    >
                      <i className="fa fa-minus" />
                    </Button>
                    <span className="w-100 items-center">{quantity}</span>
                    <Button
                      className="btn-just-icon float-right"
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
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default DishCard;
