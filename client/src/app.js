// scss import
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from 'redux/store';
import {PersistGate} from 'redux-persist/integration/react'

import AppLayout from 'components/app-layout';
import AppRoutes from "./routes";

class App extends Component {

  componentDidMount() {
    const {history} = this.props;
    history.listen(() => {
      window.scrollTo(0, 0);
    });
  }


  render() {
    const {location} = this.props;

    return (
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <AppLayout location={location}>
            <AppRoutes/>
          </AppLayout>
        </PersistGate>
      </Provider>
    );
  }
}

export default withRouter(App);
