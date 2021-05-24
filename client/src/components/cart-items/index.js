import React from "react";
import {Button, Col, Row, UncontrolledCollapse} from "reactstrap";
import moment from "moment";
import ReactDatetime from "react-datetime";
import {dateFormat, getImageUrl, getMealPlanTotal, getPrice} from "../../helpers/utils";

export const MealPlanCard = ({plan, index, onItemRemove, onDateChange}) => {
  return (
    <div key={`meal-card-${index}`} className="meal-card">
      <div>
        <Row>
          <Col md={3} className="item-title">Meal Plan {index + 1}</Col>
          <Col md={3} className="item-title">
            {getPrice(plan.total)}
            <span
              className="custom-plan-remove"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onItemRemove(index)
              }}
            >
              <i className="fa fa-times"/>
            </span>
          </Col>
        </Row>
      </div>
      <div className="d-flex align-items-center">
        <div className="mr-2">Deliver from:</div>
        <span className="calendar-icon"><i aria-hidden={true} className="nc-icon nc-calendar-60"/></span>
        <ReactDatetime
          className="delivery-date"
          value={moment(plan.start).format(dateFormat)}
          dateFormat={dateFormat}
          timeFormat={false}
          onChange={(date) => onDateChange(index, date)}
          isValidDate={(currentDate) => moment().isBefore(currentDate)}
          inputProps={{
            placeholder: "Datetime Picker Here",
            readOnly: true
          }}
          closeOnSelect
        />
      </div>
      <Button
        className="btn-link px-0"
        color="danger"
        id={`toggler-${index}`}
      >
        View details <i className="fa fa-chevron-down"/>
      </Button>
      <UncontrolledCollapse toggler={`#toggler-${index}`}>
        <Row>
          {
            Object.values(plan.plan).map((items, index) => {
              return (
                <Col sm={6}>
                  <div className="day-label">Day {index + 1}</div>
                  {
                    items.map(item => {
                      return <div><b>{item.label}:</b> {item.mealObj?.title}</div>
                    })
                  }
                </Col>
              )
            })
          }
        </Row>
      </UncontrolledCollapse>
      <div className="divider"/>
    </div>
  )
};

export const IndividualMealCard = ({item, onItemRemove, onDateChange}) => {
  return (
    <div key={item._id} className="meal-card">
      <div className="d-flex">
        <div className="item-img">
          <img alt="..." className="img-rounded img-responsive dish-image"
               src={getImageUrl(item.images[0] || '')}
          />
          <Button
            className="btn-just-icon"
            color="danger"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onItemRemove(item._id)
            }}
          >
            <i className="fa fa-times"/>
          </Button>
        </div>
        <div className="ml-3 my-auto">
          <div className="item-title">{item.title}</div>
          <div className="item-label">Price: <span>{getPrice(item.price * item.quantity)}</span></div>
          <div className="item-label">Quantity: <span>{item.quantity}</span></div>
          <div className="item-label d-flex align-items-center">
            Delivered on:
            <span className="calendar-icon ml-2"><i aria-hidden={true} className="nc-icon nc-calendar-60"/></span>
            <ReactDatetime
              className="delivery-date"
              value={moment(item.deliveryDate).format(dateFormat)}
              dateFormat={dateFormat}
              onChange={(date) => onDateChange(item._id, date)}
              timeFormat={false}
              isValidDate={(currentDate) => moment().subtract(1, 'day').isBefore(currentDate)}
              inputProps={{
                placeholder: "Datetime Picker Here",
                readOnly: true
              }}
              closeOnSelect
            />
          </div>
        </div>
      </div>
      <div className="divider"/>
    </div>
  )
}
