/**
 * @require ProductItem.less
 */

import React, { PropTypes } from 'react';

function ProductItem({ data }) {
  return (
    <li className="product-item">
      <a href={data.productUrlWap} className="item-wrap">
        <img src={data.picUrl} width="150px" height="150px" alt="" />
        <div className="product-desc">{data.name}</div>
        <div className="product-price">
          <div className="c-flex pr">
            <div className="real-price">￥{data.price}
            </div>
            <div className="fanli">
              <span className="deco-text">返</span>
              <strong>{data.commission}</strong>
            </div>
          </div>
          <div className="c-flex pr">
            <div className="origin-price">￥{data.grossPrice}
            </div>
            <div className="discount">{data.discount}折</div>
          </div>
        </div>
      </a>
    </li>
  );
}

ProductItem.propTypes = {
  data: PropTypes.object,
};

export default ProductItem;
