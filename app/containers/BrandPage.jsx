import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Brand from '../components/brand';
import { loadProducts } from '../actions/brand.js';

function loadData(props) {
	props.loadProducts(0, props.pagination);
}

class BrandPage extends Component {
    componentWillMount() {
        loadData(this.props);
    }
    render() {
        const { brand, products, pagination } = this.props;
        return (
            <div>
                <Brand brand={brand} products={products} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { brand, products, pagination } = state;
    return {
        brand,
        products,
        pagination,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loadProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandPage);
