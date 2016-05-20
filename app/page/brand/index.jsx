// main.js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import BrandPage from '../../containers/BrandPage.jsx';
import brandReducer from '../../reducers/BrandReducer.js';
import configureStore from '../../stores/configureStore';

// 为了使触摸事件生效，在渲染所有组件之前调用
// React.initializeTouchEvents(true);

// 从后端（smart）获取初始的状态
const store = configureStore(brandReducer);

render(
    <Provider store={store}>
        <div>
            <Router history={browserHistory}>
                <Route path="/app/page/brand/" component={BrandPage}>
                </Route>
            </Router>
        </div>
    </Provider>,
    document.getElementById('example')
);
