import $ from '../../node_modules/jquery/dist/jquery.min.js';

export const FETCH_REBATES_SUCCESS = 'FETCH_REBATES_SUCCESS';

function receiveRebates(cateId, currPage, products) {
    return {
        type: FETCH_REBATES_SUCCESS,
        cateId,
        products,
        currPage,
    };
}

export function loadRebates(cateId, currPage) {
    const p = currPage || 1; // 如果没有页码就是默认第一页
    return (dispatch, getState) => {
        $.ajax({
            url: '/v1/rebates',
            data: {
                cateId,
                p,
                ts: new Date().getTime(),
            },
            dataType: 'JSON',
        })
        .done(data => {
            dispatch(receiveRebates(cateId, p, data.data.list));
        })
        .fail(() => {
            dispatch(receiveRebates(cateId, p, []));
        });
    };
}

function shouldFetchRebates(state, cateId, currPage) {
    const p = state.pagination[cateId];
    let result = false;
    if (!p) {
        result = true;
    } else if (p >= currPage) {
        result = false;
    } else {
        result = true;
    }

    return result;
}

export function fetchRebatesIfNeeded(cateId, currPage) {
    return (dispatch, getState) => {
        if (shouldFetchRebates(getState(), cateId, currPage)) {
            return dispatch(loadRebates(cateId, currPage));
        }
    };
}

export const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';
export function toggleDropdown() {
    return {
        type: TOGGLE_DROPDOWN,
    };
}

export const HIDE_DROPDOWN = 'HIDE_DROPDOWN';
export function hideDropdown() {
    return {
        type: HIDE_DROPDOWN,
    };
}

export const CHANGE_CATE = 'CHANGE_CATE';
export function changeCate(cateId) {
    return (dispatch, getState) => {
        dispatch(hideDropdown());
        dispatch({
            type: CHANGE_CATE,
            cateId,
        });
        if (shouldFetchRebates(getState(), cateId, 1)) { // 每次切换就到第一页去
            return dispatch(loadRebates(cateId));
        }
    };
}

export const MOVE_CATE = 'MOVE_CATE';
export function moveCate(isMoving, navLeft) {
    return {
        type: MOVE_CATE,
        isMoving,
        navLeft,
    };
}