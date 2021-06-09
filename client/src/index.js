import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './app';
import Square9 from './screens/squares/square9';

ReactDOM.render(
  <Router>
    <Square9/>
  </Router>,
  document.getElementById("root")
);
