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
            url: '/v1/account',
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

export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
function receiveOrders(orders) {
    return {
        type: FETCH_ORDER_SUCCESS,
        orders,
    };
}

export function loadOrders(sid) {
    return (dispatch, getState) => {
        $.ajax({
            url: '/v1/orders',
            data: {
                sid,
            },
            dataType: 'JSON',
        })
        .done(data => {
            dispatch(receiveOrders(data.data.list));
        })
        .fail(() => {
            dispatch(receiveOrders([]));
        });
    };
}
