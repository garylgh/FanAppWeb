import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Brand from '../components/brand';
import { loadProducts } from '../actions/brand.js';

function loadData(props, page) {
	props.loadProducts(0, page);
}

class BrandPage extends Component {
	constructor(props) {
		super(props);
		this.handleScroll = this.handleScroll.bind(this);
	}
	handleScroll(e) {
		let threshold = 300;
        let scrollTop = document.body.scrollTop;
        let winHeight = window.innerHeight;
        let scrollHeight = document.documentElement.scrollHeight;
        // 判断isLoading状态，
        if (!this.props.isLoading && (scrollHeight - winHeight - scrollTop) <= threshold) {
			let currPage = this.props.pagination;
			// loadData(this.props, currPage ? (currPage + 1) : 1);
        }
    }
    componentWillMount() {
        loadData(this.props, this.props.pagination);
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
