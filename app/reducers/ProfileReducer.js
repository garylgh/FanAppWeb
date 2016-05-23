import { combineReducers } from 'redux';
import {
    FETCH_ACCOUNT_SUCCESS,
    FETCH_ORDER_SUCCESS,
} from '../actions/profile.js';

function account(state = {}, action) {
    switch (action.type) {
    case FETCH_ACCOUNT_SUCCESS:
        return Object.assign({}, state, action.account);
    default:
        return state;
    }
}

function orders(state = [], action) {
    switch (action.type) {
    case FETCH_ORDER_SUCCESS:
        return action.orders;
    default:
        return state;
    }
}

const profileReducer = combineReducers({
    account,
    orders,
});

export default profileReducer;
