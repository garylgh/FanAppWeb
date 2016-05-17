import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CateNav from '../components/rebate/CateNav.jsx';
import ProductList from '../components/rebate/ProductList.jsx';
import { fetchRebatesIfNeeded, toggleDropdown, changeCate } from '../actions';

function loadData(props) {
	props.fetchRebatesIfNeeded(props.activeCate, props.pagination[props.activeCate]);
}

// 任何一个从 connect() 包装好的组件都可以得到一个 dispatch 方法作为组件的 props，
// 以及得到全局 state 中所需的任何内容。
// 通过调用 connect() 注入:
class RebatePage extends Component {
	constructor(props) {
		super(props);
		this.handleCateClick = this.handleCateClick.bind(this);
	}
	componentWillMount() {
		loadData(this.props);
	}
	// 点击cate事件
	handleCateClick(cateId) {
		this.props.changeCate(cateId);
	}
	render() {
		const { toggleDropdown, visibilityDropdown, activeCate, categories, products } = this.props;
		let activeProducts = products[activeCate] || [];
		return (
			<div>
				<CateNav
					activeCate={activeCate}
					categories={categories}
					visibilityDropdown={visibilityDropdown}
					toggleDD={toggleDropdown}
					onCateClick={this.handleCateClick}
				/>
				<ProductList products={activeProducts} />
			</div>
        );
	}
}

RebatePage.propTypes = {
	// 握草，居然是func，不是function
	dispatch: PropTypes.func,
	activeCate: PropTypes.string.isRequired,
	categories: PropTypes.array.isRequired,
	products: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
	const { cates, products, visibilityDropdown, pagination } = state;
	return {
		visibilityDropdown,
		activeCate: cates.activeCate,
		categories: cates.categories,
		products,
		pagination,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchRebatesIfNeeded, toggleDropdown, changeCate }, dispatch);
}

// connect() 的唯一参数是 selector。
// 此方法可以从 Redux store 接收到全局的 state，然后返回组件中需要的 props。
// 最简单的情况下，可以返回一个初始的 state （例如，返回认证方法），但最好先将其进行转化。
export default connect(mapStateToProps, mapDispatchToProps)(RebatePage);
