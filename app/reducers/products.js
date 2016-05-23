import {
	FETCH_REBATES_SUCCESS,
	FETCH_REBATES_REQUEST,
} from '../actions/rebate.js';

function products(state = {}, action) {
	let newProducts = [];
	switch (action.type) {
	case FETCH_REBATES_SUCCESS:
		if (state[action.cateId]) {
			newProducts = [].concat(state[action.cateId], action.products);
		} else {
			newProducts = [].concat(action.products);
		}
		return Object.assign({}, state, {
			[action.cateId]: newProducts,
		});
	case FETCH_REBATES_REQUEST:
	console.log('action.isLoading = ' + action.isLoading);
		return Object.assign({}, state, {
			isLoading: action.isLoading,
		});
	default:
		return state;
	}
}

export default products;

export function pagination(state = {}, action) {
	switch (action.type) {
	case FETCH_REBATES_SUCCESS:
		return Object.assign({}, state, {
			[action.cateId]: action.currPage,
		});
	default:
		return state;
	}
}
