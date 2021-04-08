import React, { useState, useEffect } from 'react';
import './header.scss';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Logo from './Logo.png';
import Cart from '../../images/icon_cart.png';
import Profile from '../../images/icon_profile.png';
import RegisterForm from "./register-form";

const links = [
  { title: 'Home' },
  { title: 'About' },
  { title: 'Contact Us' }
];
const icons = [
  {
    title: 'Cart',
    image: Cart,
  },
  {
    title: 'Profile',
    image: Profile,
  }
];
const Header = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [show, showRegisterForm] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.addEventListener('mouseup', (e) => {
      if (e && e.target && e.target.parentElement && e.target.parentElement.id !== 'toggle-btn') {
        const element = document.getElementById('main-navbar-nav');
        if (element && element.className.includes('show')) {
          document.getElementById('toggle-btn').click();
        }
      }
    });
  });

  const handleLink = (value) => {
    setActiveTab(value);
    if (value === 'About') history.push('/about');
    else if (value === 'Home') history.push('/');
    else showRegisterForm(true);
  };

  return (
    <Navbar bg="white" expand="lg" fixed="top">
      <div className="header-container">
        <Navbar.Brand onClick={() => handleLink('Home')}>
          <img src={Logo} alt="l&g" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" id="toggle-btn" className="border-0" />
      </div>
      <Navbar.Collapse id="main-navbar-nav">
        <Nav
          className="mr-auto ml-md-4 ml-sm-4 ml-4 float-md-none float-left"
          activeKey="/home"
          onSelect={handleLink}
        >
          {
            links.map((l, i) => (
              <Nav.Item key={i}>
                <Nav.Link
                  className={`mr-4 font-weight-bold text-uppercase ${activeTab === l.title ? 'active' : ''}`}
                  eventKey={l.title}
                >
                  {l.title}
                </Nav.Link>
              </Nav.Item>
            ))
          }
        </Nav>
        <Nav
          className="flex-row  mr-md-4 mr-sm-4 mr-4 float-md-none float-right"
          activeKey="/home"
          onSelect={handleLink}
        >
          {
            icons.map((i, index) => (
              <Nav.Link key={index} eventKey={i.title} className="ml-md-2 ml-3">
                <img src={i.image} alt={i.title} width="32" height="32" />
              </Nav.Link>
            ))
          }
        </Nav>
      </Navbar.Collapse>
      <RegisterForm show={show} handleClose={() => showRegisterForm(false)} />
    </Navbar>
  )
};

export default Header;
