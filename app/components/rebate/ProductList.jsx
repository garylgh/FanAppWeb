/**
 * @require ProductList.less
 */

import React, {Component, PropTypes} from 'react';
import ProductItem from './ProductItem.jsx';
import ExchangeItem from '../exchange/ExchangeItem.jsx';
import $ from '../../../node_modules/jquery/dist/jquery.min.js';

class ProductList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { products, itemType } = this.props;
    // if (!products || products.length === 0) {
    //     return (
    //         <h2>loading</h2>
    //     );
    // }

    let productNodes;
    if (itemType === 'exchange') {
      productNodes = products.map(p => (<ExchangeItem key={p.iid} data={p} />));
    } else {
      productNodes = products.map(p => (<ProductItem key={p.iid} data={p} />));
    }
    return (
      <div className="product-wrap">
        <ul className="product-list clearfix" id="productList">
          {productNodes}
        </ul>
        <div style={{ display: 'none' }} className="dropload-down">加载中...</div>
      </div>
    );
  }

}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  itemType: PropTypes.string,
};

export default ProductList;
