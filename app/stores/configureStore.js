import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(
            thunkMiddleware, // 允许我们 dispatch() 函数
            createLogger() // 一个很便捷的 middleware，用来打印 action 日志
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    return store;
}
