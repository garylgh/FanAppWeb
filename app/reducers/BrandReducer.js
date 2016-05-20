import { combineReducers } from 'redux';
import products, { brand } from './brands.js';

const brandReducer = combineReducers({
    brand,
    products,
});

export default brandReducer;
