/**
 * @require ProductItem.less
 */

import React, { PropTypes } from 'react';

function ProductItem({ data }) {
    return (
        <li className="product-item">
            <div className="item-wrap">
                <img src={`http://${data.image}`} width="150px" height="150px" alt="" />
                <div className="product-desc">{data.title}</div>
                <div className="product-price">
                    <div className="c-flex pr">
                        <div className="real-price">￥{data.price_real} </div>
                        <div className="fanli">{data.fanli} </div>
                    </div>
                    <div className="c-flex pr">
                        <div className="origin-price">￥{data.price_market} </div>
                        <div className="discount">{data.discount}折</div>
                    </div>
                </div>
            </div>
        </li>
    );
}

ProductItem.propTypes = {
    data: PropTypes.object,
};

export default ProductItem;
