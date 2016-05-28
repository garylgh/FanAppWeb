// main.js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import SearchPage from '../../containers/SearchPage';
import rootReducer from '../../reducers';
import configureStore from '../../stores/configureStore';

// 为了使触摸事件生效，在渲染所有组件之前调用
// React.initializeTouchEvents(true);

// 从后端（smart）获取初始的状态
const store = configureStore(rootReducer, {
    products: [{
        "T": "buProduct",
        "iid": "8192",
        "name": "\u83f2\u8bd7\u5c0f\u94fa \u6d6a\u6f2b\u9082\u9005 \u9999\u6c34\u6c90\u6d74\u9732900ml",
        "picUrl": "http:\/\/d6.yihaodianimg.com\/N05\/M03\/16\/33\/CgQI01WbKkyAUs_eAAF7bon_-uQ13100_380x380.jpg",
        "categoryId": "22",
        "srcType": 1,
        "grossPrice": "88",
        "price": "69.90",
        "discount": "0.79",
        "commissionRate": "0.36",
        "commission": "25.2",
        "jumpType": 0,
        "picTargetUrl": "https:\/\/click.yhd.com\/?ut=1517120888&s=ZTgxMjZiYTg5MWY0ZDNkYjEwOGE0MzQyNWM5NjljNDIyNzUwZDY5ZjkyNTNhYTE1ZTRlMGVjZmE4YWY2YzVjMGEyMGM5ZWE5OGVmNjg4MDg0NDA3YmFmMzZiYzQ4MTA1OGU1MDdlOWE1NGRmMjAzN2U2YjE0NTc3Y2RkODIyNDE%3D&cv=1"
    }, {
        "T": "buProduct",
        "iid": "11776",
        "name": "\u83f2\u8bd7\u5c0f\u94fa \u521d\u604b\u751c\u5fc3\u9999\u6c34\u6d17\u53d1\u6c34400ML 2\u74f6  \u62a4\u53d1\u7d20400ML\u6d17\u62a4\u5957\u88c5",
        "picUrl": "http:\/\/d7.yihaodianimg.com\/N06\/M00\/2F\/5E\/CgQIzVZfrD2AcQbcAAOWAlrOTPI00100_380x380.jpg",
        "categoryId": "22",
        "srcType": 1,
        "grossPrice": "135",
        "price": "59.80",
        "discount": "0.44",
        "commissionRate": "0.36",
        "commission": "21.5",
        "jumpType": 0,
        "picTargetUrl": "https:\/\/click.yhd.com\/?ut=1517120888&s=ZTgxMjZiYTg5MWY0ZDNkYjEwOGE0MzQyNWM5NjljNDJjNWVmYTJjODc3NWRlZGRjZThlZjNhNDc0MTA5YmRmYjg5NTViNGMyNjVjNDZkYzc0ZjNkM2Y4OWJkOWVmN2Q3OGU1MDdlOWE1NGRmMjAzN2U2YjE0NTc3Y2RkODIyNDE%3D&cv=1"
    }],
    pagination: 1,
});

render(
    <Provider store={store}>
        <SearchPage />
    </Provider>,
    document.getElementById('example')
);
