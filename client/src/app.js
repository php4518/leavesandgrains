// scss import
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";

import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from 'redux/store';

import AppLayout from 'components/app-layout';
import Index from 'views';
import HomePage from 'screens/home';
import MenuPage from 'screens/menu';
import AboutPage from 'screens/about';
import ContactPage from 'screens/contact';
import RegisterPage from 'screens/sign-in';

class App extends Component {

  componentDidMount() {
    const { history } = this.props;
    history.listen(() => {
      window.scrollTo(0, 0);
    });
  }

  render() {
    const { location } = this.props;
    return (
      <Provider store={store}>
        <AppLayout location={location}>
          <Switch location={location}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/index" component={Index} />
            <Route path="/menu" component={MenuPage}/>
            <Route path="/blog" component={AboutPage}/>
            <Route path="/contact" component={ContactPage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/register" component={RegisterPage}/>
            <Redirect to="/" />
          </Switch>
        </AppLayout>
      </Provider>
    );
  }
}

export default withRouter(App);
