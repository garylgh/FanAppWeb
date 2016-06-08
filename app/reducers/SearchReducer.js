import {
  combineReducers,
} from 'redux';
import {
  CHANGE_KEYWORD,
  FETCH_SEARCH_REQUEST,
  FETCH_SEARCH_SUCCESS,
} from '../actions/search.js';

function searchReducer(state = {}, action) {
  switch (action.type) {
    case CHANGE_KEYWORD:
      return Object.assign({}, state, {
        keyword: action.keyword,
      });
    case FETCH_SEARCH_SUCCESS: {
      let newProducts;
      if (action.pagination === 1) {
        newProducts = action.products;
      } else {
        newProducts = [].concat(state.products, action.products);
      }
      return Object.assign({}, state, {
        products: newProducts,
        pagination: action.pagination,
        keyword: action.keyword,
      });
    }
    case FETCH_SEARCH_REQUEST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    default:
      return state;
  }
}

export default searchReducer;
