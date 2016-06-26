// main.js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import ProfilePage from '../../containers/ProfilePage.jsx';
import profileReducer from '../../reducers/ProfileReducer.js';
import configureStore from '../../stores/configureStore';
import changeAvatar from '../../actions/profile.js';

import Account from '../../components/user-center/Account.js';
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

/**
 * 此接口暴露给App外壳调用
 */
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  const WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
}

setupWebViewJavascriptBridge((bridge) => {
  // 修改头像
  bridge.registerHandler('avatarUploaded', (avatarUrl) => {
    store.dispatch(changeAvatar(avatarUrl));
  });
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
