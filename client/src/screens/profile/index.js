import React, {useState} from "react";
import {Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import {useLocation} from "react-router";
import {useSelector} from "react-redux";
import MenuHeader from "../../components/header/menuHeader";
import AppAlert from "../../components/alert";
import UserProfile from "../../components/user-profile";
import UserOrders from "../../components/user-orders";

const tabs = ['Profile', 'Orders'];

const Profile = () => {
  const {state: {orderStatus} = {}} = useLocation();
  const currentUser = useSelector(({user: {currentUser}}) => currentUser);
  const [activeTab, setActiveTab] = useState(orderStatus ? tabs[1] : tabs[0]);

  return (
    <div className="profile-page">
      <MenuHeader/>
      <div className="mx-5">
        <AppAlert alert={orderStatus}/>
        <h1>Hello, {currentUser.name}</h1>
        <div className="divider mt-2"/>
      </div>
      <Container>
        <Row>
          <Col md={2}>
            <Nav id="tabs" role="tablist" tabs className="border-right">
              {
                tabs.map((tab, i) =>
                  <NavItem key={i}>
                    <NavLink className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>
                      {tab}
                    </NavLink>
                  </NavItem>
                )
              }
            </Nav>
          </Col>
          <Col md={10}>
            <TabContent activeTab={activeTab} className="text-center">
              <TabPane tabId={tabs[0]}>
                <UserProfile />
              </TabPane>
              <TabPane tabId={tabs[1]}>
                <UserOrders />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
