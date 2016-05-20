import React, { PropTypes } from 'react';
import Logo from './Logo.jsx';
import ProductList from '../rebate/ProductList.jsx';

class Brand extends React.Component {
	render() {
		const { brand, products } = this.props;
		return (
			<div>
				<Logo brand={brand} />
				<div className="brand">
					<ProductList products={products} />
				</div>
			</div>
		);
	}
}

Brand.propTypes = {
	brand: PropTypes.object.isRequired,
	products: PropTypes.array.isRequired,
};

export default Brand;
