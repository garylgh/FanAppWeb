import {
  combineReducers,
} from 'redux';
import {
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ORDER_SUCCESS,
  CHANGE_ORDER_TAB,
  FETCH_WITHDRAW_SUCCESS,
  CHANGE_WITHDRAW_TAB,
  CHANGE_USER_AVATAR,
  OPEN_MODAL,
} from '../actions/profile.js';

function account(state = {}, action) {
  switch (action.type) {
    case FETCH_ACCOUNT_SUCCESS:
      return Object.assign({}, state, action.account);
    case CHANGE_USER_AVATAR: {
      const userInfo = Object.assign({}, state.userInfo, {
        avatarUrl: action.avatarUrl,
      });
      return Object.assign({}, state, {
        userInfo,
      });
    }
    default:
      return state;
  }
}

function orders(state = {}, action) {
  switch (action.type) {
    case FETCH_ORDER_SUCCESS: {
      let orderList;
      if (state.orderDict[action.selectedIndex]) {
        orderList = [].concat(state.orderDict[action.selectedIndex], action.orders);
      } else {
        orderList = [].concat(action.orders);
      }

      const orderDict = Object.assign({}, state.orderDict, {
        [action.selectedIndex]: orderList,
      });

      const pagination = Object.assign({}, state.pagination, {
        [action.selectedIndex]: action.page,
      });

      return Object.assign({}, state, {
        orderDict,
        pagination,
      });
    }
    case CHANGE_ORDER_TAB:
      return Object.assign({}, state, {
        selectedIndex: action.selectedIndex,
      });
    default:
      return state;
  }
}

function withdraws(state = {}, action) {
  switch (action.type) {
    case FETCH_WITHDRAW_SUCCESS: {
      let list;
      if (state.withdrawDict[action.selectedIndex]) {
        list = [].concat(state.withdrawDict[action.selectedIndex], action.withdraws);
      } else {
        list = [].concat(action.withdraws);
      }

      const withdrawDict = Object.assign({}, state.withdrawDict, {
        [action.selectedIndex]: list,
      });

      const pagination = Object.assign({}, state.pagination, {
        [action.selectedIndex]: action.page,
      });

      return Object.assign({}, state, {
        withdrawDict,
        pagination,
      });
    }
    case CHANGE_WITHDRAW_TAB:
      return Object.assign({}, state, {
        selectedIndex: action.selectedIndex,
      });
    default:
      return state;
  }
}

function modal(state = {
  modalIsOpen: false,
}, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return Object.assign({}, state, {
        modalIsOpen: action.modalIsOpen,
      });
    default:
      return state;
  }
}

const profileReducer = combineReducers({
  account,
  orders,
  withdraws,
  modal,
});

export default profileReducer;
