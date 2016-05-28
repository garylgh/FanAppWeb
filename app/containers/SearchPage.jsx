import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProductList from '../components/rebate/ProductList.jsx';

// function loadData(props, page) {
// 	props.fetchRebatesIfNeeded(props.activeCate, page);
// }

const keybarStyles = {
	position: 'fixed',
    background: '#fff',
	borderLeft: '5px solid #FC3768',
	width: '100%',
	display: 'flex',
};
const keyStyles = {
	height: '1.2rem',
	lineHeight: '1.2rem',
    padding: '0 0.3rem',
    fontSize: '32px',
}

function KeywordBar({ keyword }) {
	return (
		<section style={keybarStyles}>
			<div style={keyStyles}>关键字：{keyword}</div>
		</section>
	)
}

class SearchPage extends Component {
	constructor(props) {
		super(props);
		// this.handleScroll = this.handleScroll.bind(this);
	}
	componentWillMount() {
		// loadData(this.props, this.props.pagination[this.props.activeCate]);
	}
	// handleScroll(e) {
	// 	let threshold = 300;
    //     let scrollTop = document.body.scrollTop;
    //     let winHeight = window.innerHeight;
    //     let scrollHeight = document.documentElement.scrollHeight;
    //     // 判断isLoading状态，
    //     if (!this.props.products.isLoading && (scrollHeight - winHeight - scrollTop) <= threshold) {
	// 		let currPage = this.props.pagination[this.props.activeCate];
	// 		loadData(this.props, currPage ? (currPage + 1) : 1);
    //     }
    // }
	// componentDidMount() {
	// 	window.addEventListener('scroll', this.handleScroll);
	// }
	// componentWillUnmount() {
	// 	window.removeEventListener('scroll', this.handleScroll);
	// }
	render() {
		const { products, keyword } = this.props;
		return (
			<div>
				<KeywordBar keyword={keyword}/>
				<ProductList products={products} />
			</div>
        );
	}
}

SearchPage.propTypes = {
	dispatch: PropTypes.func,
	products: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
	const { products, keyword, pagination } = state;
	return {
		products,
		pagination,
		keyword,
	};
}

export default connect(mapStateToProps)(SearchPage);
