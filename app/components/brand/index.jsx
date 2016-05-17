import React, { PropTypes } from 'react';
import Logo from './Logo.jsx';
import ProductList from '../rebate/ProductList.jsx';
import { connect } from 'react-redux';

class Brand extends React.Component {
	render() {
		const { brand, products } = this.props;
		return (
			<div>
				<Logo brand={brand} />
				<ProductList products={products} />
			</div>
		);
	}
}

Brand.propTypes = {
	brand: PropTypes.object.isRequired,
	products: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
	return { brand: state.brands.brand, products: state.brands.list };
}

export default connect(mapStateToProps)(Brand);
