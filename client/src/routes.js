import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import HomePage from "./screens/home";
import Index from "./views";
import MenuPage from "./screens/menu";
import OrderHome from "./screens/order-home";
import BlogPage from "./screens/blogs";
import AboutPage from "./screens/about";
import ContactPage from "./screens/contact";
import SignInPage from "./screens/sign-in";
import SignUpPage from "./screens/sign-up";
import CartHome from "./screens/cart";
import PaymentHome from "./screens/payment";
import ProfileHome from "./screens/profile";
import Stockists from "./screens/stockists";

const AppRoutes = (props) => {
  const {location} = props;
  const currentUser = useSelector(({user: {currentUser}}) => currentUser);

  const PrivateRoute = ({component: Component, ...rest}) =>
    <Route {...rest} render={props => (
      (currentUser && currentUser._id) ?
        <Component {...props} />
        : <Redirect to="/sign-in"/>
    )}/>;

  return (
    <Switch location={location}>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/index" component={Index}/>
      <Route path="/menu" component={MenuPage}/>
      <Route path="/order" component={OrderHome}/>
      <Route path="/blog" component={BlogPage}/>
      <Route path="/contact" component={ContactPage}/>
      <Route path="/about" component={AboutPage}/>
      <Route path="/stockists" component={Stockists}/>
      <Route path="/sign-in" component={SignInPage}/>
      <Route path="/sign-up" component={SignUpPage}/>
      <Route path="/cart" component={CartHome}/>
      <PrivateRoute path="/payment" component={PaymentHome}/>
      <PrivateRoute path="/profile" component={ProfileHome}/>
      <Redirect to="/"/>
    </Switch>
  )
}

export default AppRoutes;
