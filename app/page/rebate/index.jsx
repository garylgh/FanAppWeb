// main.js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import RebatePage from '../../containers/RebatePage';
import Brand from '../../components/brand';
import rootReducer from '../../reducers';
import configureStore from '../../stores/configureStore';

// 为了使触摸事件生效，在渲染所有组件之前调用
// React.initializeTouchEvents(true);

// 从后端（smart）获取初始的状态
const store = configureStore(rootReducer, {
    cates: {
        isMoving: false,
        navLeft: 0,
        activeCate: '0',
        categories: [{
            id: '0',
            name: '全部',
        }, {
            id: '1',
            name: '食品酒水',
        }, {
            id: '2',
            name: '女装',
        }, {
            id: '3',
            name: '数码家电',
        }, {
            id: '4',
            name: '美妆个护',
        }, {
            id: '5',
            name: '家具百货',
        }, {
            id: '6',
            name: '男装',
        }, {
            id: '7',
            name: '鞋包配饰',
        }],
    },
});

// store.subscribe(() =>
//     console.log(store.getState())
// );

// render(
//     <Provider store={store}><RebatePage /></Provider>,
//     document.getElementById('example')
// );

render(
    <Provider store={store}>
        <div>
            <Router history={browserHistory}>
                <Route path="/app/page/rebate/" component={RebatePage}>
                </Route>
            </Router>
        </div>
    </Provider>,
    document.getElementById('example')
);
//
// render(
//     <Router history={browserHistory}>
//         <Route path="/app/page/" component={Brand}>
//         </Route>
//         <Route path="/app/page/other" component={Other} />
//     </Router>,
//     document.getElementById('example')
// );
