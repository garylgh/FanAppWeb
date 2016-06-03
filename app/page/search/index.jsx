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
function doSearch(keyword) {
  store.dispatch(loadSearch(keyword, 1));
}

render(
  <Provider store={store}>
    <SearchPage />
  </Provider>,
  document.getElementById('example')
);
