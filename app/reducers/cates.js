import {
	TOGGLE_DROPDOWN,
	HIDE_DROPDOWN,
    CHANGE_CATE,
} from '../actions';

const initialState = {
	activeCate: '0',
	categories: [],
};

export function cates(state, action) {
	if (typeof state === 'undefined') {
		return initialState;
	}
    switch (action.type) {
        case CHANGE_CATE:
            return Object.assign({}, state, {
                activeCate: action.cateId,
            });
        default:
            return state;
    }
}

export function visibilityDropdown(state=false, action) {
    switch (action.type) {
        case TOGGLE_DROPDOWN:
            return !state;
		case HIDE_DROPDOWN:
			return false;
        default:
            return state;
    }
}
