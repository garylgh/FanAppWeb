import $ from '../../node_modules/jquery/dist/jquery.min.js';

export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';

function receiveProducts(currPage, brand, products) {
    return {
        type: FETCH_PRODUCT_SUCCESS,
        brand,
        products,
        currPage,
    };
}

export const FETCH_PRODUCT_REQUSET = 'FETCH_PRODUCT_REQUSET';
function requestProduct(isLoading) {
    return {
        type: FETCH_PRODUCT_REQUSET,
        isLoading,
    }
}

export function loadProducts(brandId, currPage) {
    const p = currPage || 1; // 如果没有页码就是默认第一页
    return (dispatch, getState) => {
        dispatch(requestProduct(true));
        $.ajax({
            url: '/v1/products',
            data: {
                brandId,
                p,
            },
            dataType: 'JSON',
        })
        .done(data => {
            dispatch(requestProduct(false));
            dispatch(receiveProducts(p, data.data.obj, data.data.list));
        })
        .fail(() => {
            dispatch(requestProduct(false));
            dispatch(receiveProducts(p, {}, []));
        });
    };
}
