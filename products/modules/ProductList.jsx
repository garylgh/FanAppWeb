/**
 * @require product-list.less
 */

import React from 'react';
import ProductItemA from './ProductItemA.jsx';
import ProductItemB from './ProductItemB.jsx';
import $ from '../../node_modules/jquery/dist/jquery.min.js';

// const propTypes = {
//     data: PropTypes.array,
// };

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listStyle: 0,
            products: [],
        };
        // 参考： https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
        this._changeListStyle = this._changeListStyle.bind(this);
    }
    componentDidMount() {
        this.serverRequest = $.ajax({
            url: '/fanliba/v1/products',
            type: 'GET',
            dataType: 'JSON',
        })
        .done((data) => {
            // console.log(JSON.stringify(data));
            this.setState({
                products: data.data.list_product,
            });
        })
        .fail(() => {
            this.setState({
                products: [5, 6, 7, 8],
            });
        });
    }
    _changeListStyle() {
        console.log('click button');
        this.setState({
            listStyle: !this.state.listStyle,
        });
    }
    render() {
        let productNodes;
        if (this.state.listStyle) {
            productNodes = this.state.products.map(p => (<ProductItemA data={p} />));
        } else {
            productNodes = this.state.products.map(p => (<ProductItemB data={p} />));
        }
        return (
            <div className="product-wrap">
                <button onClick={this._changeListStyle}>
                    {this.state.listStyle ? '样式一' : '样式二'}
                </button>
                <ul className="product-list">
                    {productNodes}
                </ul>
            </div>
        );
    }
}

// ProductList.propTypes = propTypes;

export default ProductList;
