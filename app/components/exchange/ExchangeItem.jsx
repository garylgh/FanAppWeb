/**
 * @require ../rebate/ProductItem.less
 */

import React, { PropTypes } from 'react';
import {
  Link,
} from 'react-router';

function ExchangeItem({ data }) {
    let toUrl;
    switch (data.type) {
        case 0:
            toUrl = "charge";
            break;
        case 1:
            toUrl = "alipay";
            break;
        case 2:
            toUrl = "qq";
            break;
        default:
            toUrl = 'qq';
    }
    let query = {
        iid: data.iid,
        price: data.price,
        grossPrice: data.grossPrice,
        coin: data.coin,
        availableCoin: data.availableCoin,
        stock: data.stock,
    }
    return (
        <li className="product-item">
            <Link to={toUrl} query={query} className="item-wrap">
                <img src={data.picUrl} width="150px" height="150px" alt="" />
                <div className="exchange-desc">{data.name}</div>
                <div className="product-price">
                    <div className="c-flex pr">
                        <div className="exchange-price">{data.coin}金币{data.price == 0 ? "" : `+${data.price}元`}</div>
                        <div className="exchange-origin-price">￥{data.grossPrice} </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}

ExchangeItem.propTypes = {
    data: PropTypes.object,
};

export default ExchangeItem;
