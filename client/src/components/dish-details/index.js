import React from "react";
import {Row, Col, Modal, Nav, NavItem, NavLink, TabContent, TabPane, Table} from "reactstrap";
import {allGainDetails, getPrice} from "../../helpers/utils";
import {DISH_DETAILS_TAB} from "../../helpers/constants";
import ImageCarousel from "../image-carousel";

const DishDetails = ({ dish, show = false, toggleModal }) => {
  const [activeTab, setActiveTab] = React.useState(DISH_DETAILS_TAB[0]);
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  if(!show) return null
  return (
    <Modal isOpen={show} toggle={toggleModal} size="xl" className="dish-details">
      <div className="modal-body">
        <button
          aria-label="Close"
          className="close"
          type="button"
          onClick={toggleModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
        <Row>
          <Col md="6" sm="12" className="pr-md-0">
            <ImageCarousel items={dish.images}/>
          </Col>
          <Col md="6" sm="12" className="scroll-content">
            <div>
              <h5 className="modal-title mb-3">{dish.title}</h5>
              <div className="description">{dish.description}</div>
              <Row className="mt-3 mb-2">
                <Col><p className="dish-price">{getPrice(dish.price)}</p></Col>
                <Col className="d-flex align-items-end justify-content-end">{allGainDetails(dish)}</Col>
              </Row>
              <div className="divider"/>
              <div>
                <div className="nav-tabs-navigation">
                  <div className="nav-tabs-wrapper">
                    <Nav id="tabs" role="tablist" tabs>
                      {
                        DISH_DETAILS_TAB.map(tab =>
                          <NavItem>
                            <NavLink
                              className={activeTab === tab ? "active" : ""}
                              onClick={() => toggle(tab)}
                            >
                              {tab}
                            </NavLink>
                          </NavItem>
                        )
                      }
                    </Nav>
                  </div>
                </div>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId={DISH_DETAILS_TAB[0]} className="px-5 text-center">
                    <Row className="mb-2">
                      <Col className="text-left">
                        <div className="description font-weight-bold">1 Serving</div>
                      </Col>
                      <Col className="text-right">
                        <div className="description font-weight-bold">per serving {dish.servingWeight}g</div>
                      </Col>
                    </Row>
                    <div className="nutritions">
                      {
                        dish.nutritions.map(({name, perServing}, index) =>
                          <Row className="py-1">
                            <Col className="text-left">{name}</Col>
                            <Col className="text-right">{perServing}</Col>
                          </Row>
                        )
                      }
                    </div>
                  </TabPane>
                  <TabPane tabId={DISH_DETAILS_TAB[1]}>
                    <div className="main-details">
                      <b>Ingredients:</b> {dish.ingredients}
                    </div>
                    <div className="important-details my-2">
                      Contains: {dish.contains}
                    </div>
                    <div className="sub-details">
                      {dish.ingredientInstructions}
                    </div>
                  </TabPane>
                  <TabPane tabId={DISH_DETAILS_TAB[2]}>
                    <div className="main-details" dangerouslySetInnerHTML={{__html: dish.instructions || ''}} />
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  )
}

export default DishDetails;
