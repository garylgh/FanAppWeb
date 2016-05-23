/**
 * @require ProductList.less
 */

import React, { Component, PropTypes } from 'react';
import ProductItem from './ProductItem.jsx';
import $ from '../../../node_modules/jquery/dist/jquery.min.js';

class ProductList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { products } = this.props;
        if (!products || products.length === 0) {
            return (
                <h2>loading</h2>
            );
        }

        let productNodes = products.map(p => (<ProductItem data={p} />));
        return (
            <div className="product-wrap" >
                <ul className="product-list">
                    {productNodes}
                </ul>
                <div class="dropload-down">加载中...</div>
            </div>
        );
    }

}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
};

export default ProductList;
