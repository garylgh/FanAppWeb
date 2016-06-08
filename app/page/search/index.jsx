// main.js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import SearchPage from '../../containers/SearchPage';
import rootReducer from '../../reducers/SearchReducer';
import configureStore from '../../stores/configureStore';
import { loadSearch } from '../../actions/search';

// 从后端（smart）获取初始的状态
const initialState = {
  products: [],
  pagination: 1,
  keyword: '',
  isLoading: false,
};
const store = configureStore(rootReducer, initialState);

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
  bridge.registerHandler('doSearch', (keyword) => {
    store.dispatch(loadSearch(keyword, 1));
  });
  // 应对页面reload的情况
  bridge.callHandler('extReq', null, (keyword) => {
    setTimeout(() => {
      if (keyword) {
        store.dispatch(loadSearch(keyword, 1));
      }
    }, 0);
  });
});

render(
  <Provider store={store}>
    <SearchPage />
  </Provider>,
  document.getElementById('example')
);
