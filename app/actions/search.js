import $ from '../../node_modules/jquery/dist/jquery.min.js';

export const CHANGE_KEYWORD = 'CHANGE_KEYWORD';
export function changeKeyword(keyword) {
  return {
    type: CHANGE_KEYWORD,
    keyword,
  };
}

export const FETCH_SEARCH_REQUEST = 'FETCH_SEARCH_REQUEST';
function requstSearch(isLoading) {
  return {
    type: FETCH_SEARCH_REQUEST,
    isLoading,
  };
}

export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS';
function receiveSearch(keyword, pagination, products) {
  return {
    type: FETCH_SEARCH_SUCCESS,
    keyword,
    pagination,
    products,
  };
}

export function loadSearch(keyword, currPage) {
  const p = currPage || 1; // 如果没有页码就是默认第一页
  return (dispatch, getState) => {
    dispatch(requstSearch(true));
    $.ajax({
      url: '/fanliba/v1/search',
      data: {
        qw: keyword,
        p,
        qt: 0, //qt=0表示是按产品名称, 品牌, 或类型 数据库%%查询
        ts: new Date().getTime(),
      },
      dataType: 'JSON',
    })
    .done(data => {
      dispatch(receiveSearch(keyword, p, data.data.list));
      dispatch(requstSearch(false));
    })
    .fail(() => {
      dispatch(receiveSearch(keyword, p, []));
      dispatch(requstSearch(false));
    });
  };
}

// function shouldFetchSearch(state, keyword, page) {
//   const currPage = state.pagination[cateId];
//   let result = false;
//   if (!currPage) {
//     result = true;
//   } else if (currPage >= page) {
//     result = false;
//   } else {
//     result = true;
//   }
//
//   return result;
// }
//
// export function fetchSearchIfNeeded(keyword, page) {
//   return (dispatch, getState) => {
//     if (shouldFetchSearch(getState(), keyword, page)) {
//       return dispatch(loadSearch(keyword, page));
//     }
//   };
// }
