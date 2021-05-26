import React, {useEffect} from "react";
import {Button, Col, Container, Row, Table, UncontrolledCollapse} from "reactstrap";
import moment from "moment";
import AppAlert from "../alert";
import {getMyOrders} from "../../redux/actions/user";
import {useDispatch, useSelector} from "react-redux";
import {dateFormat} from "../../helpers/utils";
import {useHistory} from "react-router";

const UserOrders = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {userStatus, orders, currentUser} = useSelector(({user}) => {
    const {userStatus, orders, currentUser} = user;
    return {userStatus, orders, currentUser};
  });

  useEffect(() => dispatch(getMyOrders(currentUser._id)), []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSupport = (order) => {
    history.push('/contact', {order});
  };

  const renderDeliveryStatus = (status) => {
    switch (status) {
      case 'Delivered':
        return <div className="mr-2 text-success font-weight-bold">
          <i className="fa fa-check-circle" aria-hidden="true"/> {status}
        </div>
      case 'Out for delivery':
        return <div className="mr-2 text-warning font-weight-bold">
          <i className="fa fa-exclamation-circle" aria-hidden="true"/> {status}
        </div>
      default:
        return <div className="mr-2 text-muted">
          <i className="fa fa-exclamation-circle" aria-hidden="true"/> Not Delivered
        </div>
    }
  };

  return (
    <Container className="orders">
      <AppAlert alert={userStatus}/>
      <Row>
        <Col>
          <Table responsive bordered>
            <thead>
            <tr>
              <th>Orders</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {
              orders.map((order, index) => {
                return <tr>
                  <td>
                    <div className="order-title">Order #{orders.length - index}</div>
                    <div>
                      <Button
                        className="btn-link px-0"
                        color="danger"
                        id={`toggler-${index}`}
                      >
                        View details <i className="fa fa-chevron-down"/>
                      </Button>
                    </div>
                    <UncontrolledCollapse className="order-details" toggler={`#toggler-${index}`}>
                      {
                        order.individualMeals.length ?
                          <>
                            <div className="plan-title">Individual Meals</div>
                            <div className="p-2">
                              {
                                order.individualMeals.map(im =>
                                  <div className="mb-2">
                                    <div className="d-flex justify-content-between">
                                      <div>{im.quantity} X {im.title}</div>
                                      {renderDeliveryStatus(im.deliveryStatus)}
                                    </div>
                                    <div className="text-muted small">( {moment(im.deliveryDate).format(dateFormat)} )
                                    </div>
                                  </div>
                                )
                              }
                            </div>
                          </> : null
                      }
                      {
                        order.mealPlans.length ?
                          <>
                            <div className="plan-title">Meal Plans</div>
                            <div className="p-2">
                              {
                                order.mealPlans.map((mp, i) =>
                                  <>
                                    <b className="text-danger"># {i + 1} From {moment(mp.start).format(dateFormat)}</b>
                                    {
                                      mp.plan.map(plan =>
                                        <div className="mb-2">
                                          <b>{plan.dayLabel}</b>
                                          {
                                            plan.items.map(item =>
                                              <div className="d-flex justify-content-between">
                                                <div>{item.label}: {item.title}</div>
                                                {renderDeliveryStatus(item.deliveryStatus)}
                                              </div>
                                            )
                                          }
                                        </div>
                                      )
                                    }
                                    <div className="divider"/>
                                  </>
                                )
                              }
                            </div>
                          </> : null
                      }
                    </UncontrolledCollapse>
                  </td>
                  <td>{moment(order.createdAt).format(`${dateFormat}[\n]hh:mm a`)}</td>
                  <td>
                    {
                      order.isCanceled ?
                        <div>
                          Cancelled
                          <div className="my-2 font-weight-bold text-danger">{order.cancellationReason}</div>
                          <div className="text-muted">If you have any query,
                            <Button className="btn-link text-left" color="danger"
                                    onClick={() => handleSupport(order._id)}>
                              <i className="fa fa-envelope" aria-hidden="true"/> contact our support.
                            </Button>
                          </div>
                        </div>
                        :
                        'Ordered'
                    }
                  </td>
                </tr>
              })
            }
            </tbody>
          </Table>
        </Col>
      </Row>

    </Container>
  );
}

export default UserOrders;
