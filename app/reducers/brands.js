import {
    FETCH_PRODUCT_SUCCESS,
} from '../actions/brand.js';

export function brand(state = {}, action) {
    switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
        return Object.assign({}, state, action.brand);
    default:
        return state;
    }
}

function products(state = [], action) {
    let newProducts = [];
    switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
        newProducts = [].concat(state, action.products);
        return newProducts;
    default:
        return state;
    }
}

export default products;
