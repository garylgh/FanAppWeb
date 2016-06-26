import {
  combineReducers,
} from 'redux';
import {
  FETCH_EXCHANGES_REQUEST,
  FETCH_EXCHANGES_SUCCESS,
} from '../actions/exchange.js';

function products(state = {
  list: [],
  pagination: 1,
  isLoading: false,
}, action) {
  switch (action.type) {
    case FETCH_EXCHANGES_SUCCESS: {
      let newProducts;
      if (state.list && state.list.length > 0) {
        newProducts = [].concat(state.list, action.products);
      } else {
        newProducts = [].concat(action.products);
      }
      return Object.assign({}, state, {
        list: newProducts,
        pagination: action.pagination,
      });
    }
    case FETCH_EXCHANGES_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    default:
      return state;
  }
}

const exchangeReducer = combineReducers({
  products,
});

export default exchangeReducer;
