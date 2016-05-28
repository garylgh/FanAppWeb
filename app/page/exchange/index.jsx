// main.js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import ExchangePage, { App } from '../../containers/ExchangePage';
import Alipay from '../../components/exchange/Alipay';
import Charge from '../../components/exchange/Charge';
import QQ from '../../components/exchange/QQ';
import rootReducer from '../../reducers/ExchangeReducer';
import configureStore from '../../stores/configureStore';

// 从后端（smart）获取初始的状态
const store = configureStore(rootReducer);

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={ExchangePage} />
                <Route path="alipay" component={Alipay} />
                <Route path="charge" component={Charge} />
                <Route path="qq" component={QQ} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('example')
);
