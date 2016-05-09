/**
 * @require product-item-b.less
 */

import React, { PropTypes } from 'react';

const propTypes = {
    data: PropTypes.object,
};

function ProductItem({ data }) {
    return (
        <li className="product-item-b">
            <div className="preview">
                <img src={`http://${data.image}`} alt="" />
            </div>
            <div className="inner-intro">
                <div className="product-title">{data.title}</div>
            </div>
        </li>
    );
}

ProductItem.propTypes = propTypes;

export default ProductItem;
