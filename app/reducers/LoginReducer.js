// import { combineReducers } from 'redux';
import {
  CHANGE_TAB,
  OPEN_MODAL,
  REG_ERROR,
} from '../actions/login.js';

export default function login(state = {}, action) {
  switch (action.type) {
    case CHANGE_TAB:
      return Object.assign({}, state, {
        selectedIndex: action.selectedIndex,
      });
    case OPEN_MODAL:
      return Object.assign({}, state, {
        modal: {
          modalIsOpen: action.modalIsOpen,
          content: action.content,
        },
      });
    case REG_ERROR:
      return Object.assign({}, state, {
        regError: action.regError,
      });
    default:
      return state;
  }
}
