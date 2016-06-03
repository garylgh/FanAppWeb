import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProductList from '../components/rebate/ProductList.jsx';
import { loadSearch } from '../actions/search.js';

const searchTipStyles = {
  textAlign: 'center',
  margin: '2rem auto',
  fontSize: '36px',
};

function SearchTip() {
  return (
    <div style={searchTipStyles}>请输入需要查询的商品名称</div>
  );
}

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll() {
    const threshold = 300;
    const scrollTop = document.body.scrollTop;
    const winHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    // 判断isLoading状态，
    if (!this.props.products.isLoading && (scrollHeight - winHeight - scrollTop) <= threshold) {
      const { pagination, keyword, dispatch } = this.props;
      dispatch(loadSearch(keyword, pagination ? (pagination + 1) : 1));
    }
  }
  render() {
    const { products, keyword } = this.props;

    if (!keyword) {
      return (
        <SearchTip />
      );
    }
    return (
      <ProductList products={products} wrapStyle={{ paddingTop: 0, paddingBottom: '0.3rem' }} />
    );
  }
}

SearchPage.propTypes = {
  dispatch: PropTypes.func,
  products: PropTypes.array.isRequired,
  keyword: PropTypes.string,
  pagination: PropTypes.number,
};

function mapStateToProps(state) {
  const { products, keyword, pagination } = state;
  return { products, pagination, keyword };
}

export default connect(mapStateToProps)(SearchPage);
