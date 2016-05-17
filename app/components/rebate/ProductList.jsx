/**
 * @require ProductList.less
 */

import React, { PropTypes } from 'react';
import ProductItem from './ProductItem.jsx';

function ProductList({ products }) {
    if (!products || products.length === 0) {
        return (
            <h2>loading</h2>
        )
    }

    let productNodes = products.map(p => (<ProductItem data={p} />));
    return (
        <div className="product-wrap">
            <ul className="product-list">
                {productNodes}
            </ul>
        </div>
    );
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
};

export default ProductList;
