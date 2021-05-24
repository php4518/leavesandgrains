import React, {useEffect, useState} from "react";
import classnames from "classnames";
import {
  Button,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import {logoutUser} from "../../redux/actions/user";
import {useDispatch, useSelector} from "react-redux";

const SCROLL_OFFSET = 200;

const NavigationBar = () => {
  const dispatch = useDispatch();
  const { currentUser, mealPlans, individualMeals } = useSelector(({ user, cart }) => {
    let { currentUser } = user;
    let { mealPlans, individualMeals } = cart;
    return { currentUser, mealPlans, individualMeals }
  });

  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > SCROLL_OFFSET - 1 ||
        document.body.scrollTop > SCROLL_OFFSET - 1
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < SCROLL_OFFSET ||
        document.body.scrollTop < SCROLL_OFFSET
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  const getItemCount = () => {
    const total = mealPlans.length + Object.keys(individualMeals).length;
    return total ? `(${total})` : null;
  };

  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand data-placement="bottom" href="/">
            Leaves and Grains
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1"/>
            <span className="navbar-toggler-bar bar2"/>
            <span className="navbar-toggler-bar bar3"/>
          </button>
        </div>
        <Collapse className="justify-content-end" navbar isOpen={navbarCollapse}>
          <Nav navbar>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="/menu">
                menu
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="/order">
                order meal
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="/blog">
                blogs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="/about">
                about
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="/contact">
                contact
              </NavLink>
            </NavItem>
            <NavItem>
              <Button
                className="btn-round"
                color="danger"
                href="/cart"
              >
                cart {getItemCount()}
              </Button>
            </NavItem>
            {currentUser ?
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  caret
                  color="default"
                  data-toggle="dropdown"
                  id="userMenuButton"
                  nav
                  onClick={(e) => e.preventDefault()}
                  role="button"
                >
                  Hi, {currentUser.name}
                </DropdownToggle>
                <DropdownMenu
                  aria-labelledby="userMenuButton"
                  className="dropdown-info"
                >
                  <DropdownItem href="/profile">
                    Profile
                  </DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem onClick={handleLogout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              :
              <NavItem>
                <Button
                  className="btn-round"
                  color="danger"
                  href="/sign-in"
                >
                  Sign in
                </Button>
              </NavItem>}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

