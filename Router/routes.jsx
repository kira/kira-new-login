import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux'

import Login from '../containers/LoginContainer';
// ... Other components

import UserStore from '../Store/UserStore'


export const redirect = (to) => {
    hashHistory.push(to);
};

const Routes = (
  <Provider store={UserStore}>
    <Router history={hashHistory}>
      <Route path='/' component={Login} />
      <!--Other Routes-->
    </Router>
  </Provider>
);

export default Routes;
