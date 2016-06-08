// main.js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'
import ProfilePage from '../../containers/ProfilePage.jsx';
import profileReducer from '../../reducers/ProfileReducer.js';
import configureStore from '../../stores/configureStore';

import Account from '../../components/user-center/profile/Account.js';
import Detail from '../../components/user-center/Detail.js';

// 从后端（smart）获取初始的状态
const store = configureStore(profileReducer, {
  acount: {},
  orders: {
    selectedIndex: 0,
    orderDict: {},
    pagination: {},
  },
  withdraws: {
    selectedIndex: 0,
    withdrawDict: {},
    pagination: {},
  },
});

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
render(
  <Provider store={store}>
    <Router history={appHistory}>
      <Route path="/" component={ProfilePage}>
        <Route path=":component" component={Detail} />
        <IndexRoute component={Account} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('sk-root')
);
