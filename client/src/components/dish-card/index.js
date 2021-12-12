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

  var userRole = '';
  const userDetail = JSON.parse(localStorage.getItem("persist:user"));
  if (userDetail && userDetail?.currentUser) {
    userRole = JSON.parse(userDetail?.currentUser);
  }

  return (
    <>
      {dish.category !== "SNACKS" ?
        <div className="card">
          <div className="dish-card dish-container">
            <img alt="..." className="img-rounded img-responsive image"
              src={getImageUrl(dish.images[0] || '')}
            />
            <div className="card-weight">
              <div className="weight-text">{getServingWeight(dish.servingWeight)}</div>
            </div>
            {userRole && userRole?.role === "ADMIN" ?
              <Row className="middle">
                <Button
                  aria-label="Edit"
                  className="edit text col"
                  type="button"
                  onClick={() => onEditClick(dish)}
                >
                  <Col><span aria-hidden={true}><i className="fa fa-pencil" aria-hidden="true"></i></span></Col>
                </Button>
                <Button
                  aria-label="Delete"
                  className="delete text col"
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
                      <div className="text-center" id="house-container">
                        <Button
                          className="btn-just-icon float-left"
                          color="info"
                          type="button"
                          onClick={(e) => onAddItem(e, quantity - 1)}
                        >
                          <i className="fa fa-minus" />
                        </Button>
                        <span className="badge badge-dark">{quantity}</span>
                        <Button
                          className="btn-just-icon float-right"
                          color="info"
                          type="button"
                          onClick={(e) => onAddItem(e, quantity + 1)}
                        >
                          <i className="fa fa-plus" />
                        </Button>
                      </div> :
                      <div>
                        <Button className="btn block btn-round w-100" color="info" type="button" onClick={(e) => onAddItem(e, 1)}>
                          add item
                          <i className="fa fa-plus ml-2" />
                        </Button>
                      </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>
        :
        <div className="card dish-container-snack">
          <img src={getImageUrl(dish.images[0] || '')} alt="Norway" style={{ height: 'inherit' }} className="image" onClick={() => onClick(dish)} />
          <h4 className="card-title truncate-tail-2 top-left d-flex" onClick={() => onClick(dish)}>{dish.title}| <p className="card-pricing">{getPrice(dish.price)}</p></h4>
          <div className="text-block w-100">
            {
              quantity ?
                <div className="text-center" id="house-container">
                  <Button
                    className="btn-just-icon float-left"
                    color="info"
                    type="button"
                    onClick={(e) => onAddItem(e, quantity - 1)}
                  >
                    <i className="fa fa-minus" />
                  </Button>
                  <span className="badge badge-dark">{quantity}</span>
                  <Button
                    className="btn-just-icon float-right"
                    color="info"
                    type="button"
                    onClick={(e) => onAddItem(e, quantity + 1)}
                  >
                    <i className="fa fa-plus" />
                  </Button>
                </div> :
                <Button className="btn block btn-round w-100" color="info" type="button" onClick={(e) => onAddItem(e, 1)}>
                  add item
                  <i className="fa fa-plus ml-2" />
                </Button>
            }
          </div>
          {userRole && userRole?.role === "ADMIN" ?
            <Row className="middle">
              <Button
                aria-label="Edit"
                className="edit text col"
                type="button"
                onClick={() => onEditClick(dish)}
              >
                <Col><span aria-hidden={true}><i className="fa fa-pencil" aria-hidden="true"></i></span></Col>
              </Button>
              <Button
                aria-label="Delete"
                className="delete text col"
                type="button"
                onClick={() => onDeleteClick(dish)}
              >
                <span aria-hidden={true}><i className="fa fa-trash" aria-hidden="true"></i></span>
              </Button>
            </Row>
            : null}
        </div>
      }
    </>
  )
}

export default DishCard;
