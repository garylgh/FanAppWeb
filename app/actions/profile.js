import $ from '../../node_modules/jquery/dist/jquery.min.js';

export const FETCH_ACCOUNT_SUCCESS = 'FETCH_ACCOUNT_SUCCESS';

function receiveAccount(account) {
  return {
    type: FETCH_ACCOUNT_SUCCESS,
    account,
  };
}

export function loadAccount(sid) {
  return (dispatch, getState) => {
    $.ajax({
      url: '/fanliba/v1/account',
      data: {
        sid,
      },
      dataType: 'JSON',
    })
    .done(data => {
      dispatch(receiveAccount(data.data.obj));
    })
    .fail(() => {
      dispatch(receiveAccount({}));
    });
  };
}


// ---------------- order -------------------
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
function receiveOrders(selectedIndex, page, orders) {
  return {
    type: FETCH_ORDER_SUCCESS,
    orders,
    selectedIndex,
    page,
  };
}

export function loadOrders(sid, selectedIndex, currPage) {
  const p = currPage || 1; // 如果没有页码就是默认第一页
  return (dispatch) => {
    $.ajax({
      url: '/fanliba/v1/orders',
      data: {
        reqType: selectedIndex,
        sid,
        p,
      },
      dataType: 'JSON',
    })
    .done(data => {
      dispatch(receiveOrders(selectedIndex, p, data.data.list));
    })
    .fail(() => {
      dispatch(receiveOrders(selectedIndex, p, []));
    });
  };
}

export function shouldFetchOrders(currPage, selectedIndex, page) {
  // const currPage = state.orders.pagination[selectedIndex];
  let result = false;
  if (!currPage) {
    result = true;
  } else if (currPage >= page) {
    result = false;
  } else {
    result = true;
  }

  return result;
}

export const CHANGE_ORDER_TAB = 'CHANGE_ORDER_TAB';
export function changeOrderTab(sid, selectedIndex) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_ORDER_TAB,
      selectedIndex,
    });
    const currPage = getState().orders.pagination[selectedIndex];
    if (shouldFetchOrders(currPage, selectedIndex, 1)) { // 每次切换就到第一页去
      return dispatch(loadOrders(sid, selectedIndex, 1));
    }
  };
}

// ---------------- withdraw -------------------
export const FETCH_WITHDRAW_SUCCESS = 'FETCH_WITHDRAW_SUCCESS';
function receiveWithdraws(selectedIndex, page, withdraws) {
  return {
    type: FETCH_WITHDRAW_SUCCESS,
    withdraws,
    selectedIndex,
    page,
  };
}

export function loadWithdraws(sid, selectedIndex, currPage) {
  const p = currPage || 1; // 如果没有页码就是默认第一页
  return (dispatch) => {
    $.ajax({
      url: '/fanliba/v1/balanceops',
      data: {
        reqType: selectedIndex,
        sid,
        p,
      },
      dataType: 'JSON',
    })
    .done(data => {
      dispatch(receiveWithdraws(selectedIndex, p, data.data.list));
    })
    .fail(() => {
      dispatch(receiveWithdraws(selectedIndex, p, []));
    });
  };
}

export function shouldFetchWithdraws(currPage, selectedIndex, page) {
  let result = false;
  if (!currPage) {
    result = true;
  } else if (currPage >= page) {
    result = false;
  } else {
    result = true;
  }

  return result;
}

export const CHANGE_WITHDRAW_TAB = 'CHANGE_WITHDRAW_TAB';
export function changeWithdrawTab(sid, selectedIndex) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_WITHDRAW_TAB,
      selectedIndex,
    });
    const currPage = getState().withdraws.pagination[selectedIndex];
    if (shouldFetchWithdraws(currPage, selectedIndex, 1)) { // 每次切换就到第一页去
      return dispatch(loadWithdraws(sid, selectedIndex, 1));
    }
  };
}
