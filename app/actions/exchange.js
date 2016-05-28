import $ from '../../node_modules/jquery/dist/jquery.min.js';

export const FETCH_EXCHANGES_SUCCESS = 'FETCH_EXCHANGES_SUCCESS';

function receiveExchanges(pagination, products) {
    return {
        type: FETCH_EXCHANGES_SUCCESS,
        pagination,
        products,
    };
}

export const FETCH_EXCHANGES_REQUEST = 'FETCH_EXCHANGES_REQUEST';
function requstExchanges(isLoading) {
    return {
        type: FETCH_EXCHANGES_REQUEST,
        isLoading,
    }
}

function loadExchanges(currPage) {
    const p = currPage || 1; // 如果没有页码就是默认第一页
    return (dispatch, getState) => {
        dispatch(requstExchanges(true));
        $.ajax({
            url: '/fanliba/v1/withdrawps',
            data: {
                p,
                sid: 12,
                ts: new Date().getTime(),
            },
            dataType: 'JSON',
        })
        .done(data => {
            dispatch(receiveExchanges(p, data.data.list));
            dispatch(requstExchanges(false));
        })
        .fail(() => {
            dispatch(receiveExchanges(p, []));
            dispatch(requstExchanges(false));
        });
    };
}

function shouldFetchExchanges(state, page) {
    return true;
}

export function fetchExchangeIfNeeded(page) {
    return (dispatch, getState) => {
        if (shouldFetchExchanges(getState(), page)) {
            return dispatch(loadExchanges(page));
        }
    };
}
