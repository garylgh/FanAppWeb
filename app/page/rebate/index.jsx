// main.js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import RebatePage from '../../containers/RebatePage';
import ProductList from '../../components/rebate/ProductList';
import rootReducer from '../../reducers';
import configureStore from '../../stores/configureStore';

// 从smarty获取的category的数据
const cateArray = window.CATE_DATA.list;
const store = configureStore(rootReducer, {
  cates: {
    isMoving: false,
    // navLeft: 0,
    // activeCate: window.ALL_CATE_ID,
    categories: cateArray,
  },
});

// store.subscribe(() =>
//     console.log(store.getState())
// );

// /app/page/rebate/
// /fanliba/view/rebate/
// <IndexRoute component={RebatePage} />
// <IndexRoute component={RebatePage} />
render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={RebatePage}>
        <IndexRoute component={ProductList} />
        <Route path=":cateId" component={ProductList} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('example')
);
