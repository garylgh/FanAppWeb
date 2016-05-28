// main.js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import BrandPage from '../../containers/BrandPage.jsx';
import brandReducer from '../../reducers/BrandReducer.js';
import configureStore from '../../stores/configureStore';

// 从后端（smart）获取初始的状态
const store = configureStore(brandReducer);

render(
    <Provider store={store}>
        <BrandPage />
    </Provider>,
    document.getElementById('example')
);

// <Router history={hashHistory}>
//     <Route path="/" component={BrandPage}>
//         <IndexRoute component={BrandPage} />
//     </Route>
// </Router>
