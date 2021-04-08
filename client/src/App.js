import React, { Component, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AppLayout from './AppLayout';
import { HomeContainer, AboutContainer, OrdersContainer } from "./pages";


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
      <AppLayout location={location}>
        <Switch location={location}>
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/about" component={AboutContainer} />
          <Route exact path="/orders" component={OrdersContainer} />
        </Switch>
      </AppLayout>
    );
  }
}

export default withRouter(App);
