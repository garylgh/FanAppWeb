/**
 * @require ProductList.less
 */

import React, {Component, PropTypes} from 'react';
import ProductItem from './ProductItem.jsx';
import ExchangeItem from '../exchange/ExchangeItem.jsx';
import $ from '../../../node_modules/jquery/dist/jquery.min.js';

class ProductList extends Component {
  render() {
    const { products, itemType, wrapStyle } = this.props;
    // if (!products || products.length === 0) {
    //     return (
    //         <h2>loading</h2>
    //     );
    // }

    let productNodes;
    if (itemType === 'exchange') {
      productNodes = products.map(p => (<ExchangeItem data={p} />));
      // productNodes = products.map(p => (<ExchangeItem key={p.iid} data={p} />));
    } else {
      productNodes = products.map(p => (<ProductItem data={p} />));
      // productNodes = products.map(p => (<ProductItem key={p.iid} data={p} />));
    }
    if (!productNodes || productNodes.length === 0) {
      return (
        <div className="product-wrap" style={wrapStyle}>
          <div className="dropload-down"><span>无数据...</span></div>
        </div>
      );
    }
    return (
      <div className="product-wrap" style={wrapStyle}>
        <ul className="product-list clearfix" id="productList">
          {productNodes}
        </ul>
        <div className="dropload-down"><span>加载中...</span></div>
      </div>
    );
  }

}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  itemType: PropTypes.string,
};

export default ProductList;
