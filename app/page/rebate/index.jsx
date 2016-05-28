// main.js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import RebatePage from '../../containers/RebatePage';
import rootReducer from '../../reducers';
import configureStore from '../../stores/configureStore';

// 从smarty获取的category的数据
const cateArray = window.CATE_DATA.list;
const store = configureStore(rootReducer, {
    cates: {
        isMoving: false,
        navLeft: 0,
        activeCate: '29',
        categories: cateArray,
    },
});

// store.subscribe(() =>
//     console.log(store.getState())
// );

// render(
//     <Provider store={store}><RebatePage /></Provider>,
//     document.getElementById('example')
// );

// /app/page/rebate/
// /fanliba/view/rebate/
// <div>
//     <Router history={browserHistory}>
//         <Route path="/fanliba/view/rebate/" component={RebatePage}>
//         </Route>
//     </Router>
// </div>
render(
    <Provider store={store}>
        <RebatePage />
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
