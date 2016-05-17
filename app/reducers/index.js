import { combineReducers } from 'redux';
import products, { pagination } from './products';
import { cates, visibilityDropdown } from './cates';

const rootReducer = combineReducers({
    cates,
    visibilityDropdown,
    products,
    pagination,
});

export default rootReducer;
