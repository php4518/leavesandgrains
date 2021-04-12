import React from "react";
import {Button, Col, Row} from "reactstrap";
import {getImageUrl, getPrice, allGainDetails, getServingWeight} from "../../helpers/utils";

const DishCard = ({ dish, showDetails = true, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(dish)}>
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
              <Button className="btn-round w-100" color="info" type="button">
                add item
                <i className="fa fa-plus ml-2"/>
              </Button>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default DishCard;
