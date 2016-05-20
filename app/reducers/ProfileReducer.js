import { combineReducers } from 'redux';
import {
    FETCH_ACCOUNT_SUCCESS,
} from '../actions/profile.js';

function account(state = {}, action) {
    switch (action.type) {
    case FETCH_ACCOUNT_SUCCESS:
        return Object.assign({}, state, action.account);
    default:
        return state;
    }
}

const profileReducer = combineReducers({
    account,
});

export default profileReducer;
