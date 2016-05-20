/**
 * @require ../../../node_modules/amazeui-touch/dist/amazeui.touch.css
 */
// main.js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ProfilePage from '../../containers/ProfilePage.jsx';
import profileReducer from '../../reducers/ProfileReducer.js';
import configureStore from '../../stores/configureStore';

import Account from '../../components/user-center/Account.js';
import Detail from '../../components/user-center/Detail.js';

// 为了使触摸事件生效，在渲染所有组件之前调用
// React.initializeTouchEvents(true);

// 从后端（smart）获取初始的状态
const store = configureStore(profileReducer);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/app/page/profile/" component={ProfilePage}>
                <Route path="/app/page/profile/:component" component={Detail} />
                <IndexRoute component={Account} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('sk-root')
);
