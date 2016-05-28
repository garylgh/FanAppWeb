// main.js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import LoginPage from '../../containers/LoginPage';
import rootReducer from '../../reducers/LoginReducer.js';
import configureStore from '../../stores/configureStore';

// 从后端（smart）获取初始的状态
const store = configureStore(rootReducer, {
    selectedIndex: 0,
});
render(
    <Provider store={store}>
        <LoginPage />
    </Provider>,
    document.getElementById('example')
);
