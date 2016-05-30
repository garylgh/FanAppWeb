import {
  TOGGLE_DROPDOWN,
  HIDE_DROPDOWN,
  CHANGE_CATE,
  MOVE_CATE,
} from '../actions/rebate.js';

const initialState = {
  activeCate: '0',
  categories: [],
};

export function cates(state = {
  isMoving: false,
  left: 0,
}, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case CHANGE_CATE:
      return Object.assign({}, state, {
        activeCate: action.cateId,
      });
    case MOVE_CATE:
      return Object.assign({}, state, {
        isMoving: action.isMoving,
        navLeft: action.navLeft,
      });
    default:
      return state;
  }
}

export function visibilityDropdown(state = false, action) {
  switch (action.type) {
    case TOGGLE_DROPDOWN:
      return !state;
    case HIDE_DROPDOWN:
      return false;
    default:
      return state;
  }
}
