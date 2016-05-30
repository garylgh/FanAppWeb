import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CateNav from '../components/rebate/CateNav.jsx';
import ProductList from '../components/rebate/ProductList.jsx';
import { fetchRebatesIfNeeded, toggleDropdown, changeCate, moveCate, hideDropdown } from '../actions/rebate.js';

function loadData(props, page) {
  props.fetchRebatesIfNeeded(props.activeCate, page);
}

// 任何一个从 connect() 包装好的组件都可以得到一个 dispatch 方法作为组件的 props，
// 以及得到全局 state 中所需的任何内容。
// 通过调用 connect() 注入:
class RebatePage extends Component {
  constructor(props) {
    super(props);
    this.handleCateClick = this.handleCateClick.bind(this);
    this.handleCateMove = this.handleCateMove.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleCoverClick = this.handleCoverClick.bind(this);
  }
  componentWillMount() {
    loadData(this.props, this.props.pagination[this.props.activeCate]);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // document.getElementById('productList').addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    // document.getElementById('productList').removeEventListener('scroll', this.handleScroll);
  }
  // 点击cate事件
  handleCateClick(cateId, navLeft) {
		// TODO move cate
    this.props.moveCate(true, navLeft);
    this.props.changeCate(cateId);
  }
  // 点击遮罩层
  handleCoverClick() {
    // TODO
    this.props.hideDropdown();
  }
  handleCateMove(navLeft) {
    this.props.moveCate(true, navLeft);
  }
  handleScroll() {
    const threshold = 300;
    const scrollTop = document.body.scrollTop;
    const winHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    // 判断isLoading状态，
    if (!this.props.products.isLoading && (scrollHeight - winHeight - scrollTop) <= threshold) {
      const currPage = this.props.pagination[this.props.activeCate];
      loadData(this.props, currPage ? (currPage + 1) : 1);
    }
  }
  render() {
    const {
      toggleDropdown,
			navLeft,
			visibilityDropdown,
			activeCate,
			categories,
			products,
		} = this.props;
    let activeProducts = products[activeCate] || [];
    return (
      <div>
        <CateNav
          activeCate={activeCate}
          categories={categories}
          visibilityDropdown={visibilityDropdown}
          toggleDD={toggleDropdown}
          navLeft={navLeft}
          onCateMove={this.handleCateMove}
          onCateClick={this.handleCateClick}
          onCoverClick={this.handleCoverClick}
        />
        <ProductList products={activeProducts} />
      </div>
    );
  }
}

RebatePage.propTypes = {
	// 握草，居然是func，不是function
  dispatch: PropTypes.func,
  visibilityDropdown: PropTypes.bool.isRequired,
  activeCate: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  products: PropTypes.object.isRequired,
  navLeft: PropTypes.number.isRequired,
  pagination: PropTypes.object.isRequired,
  moveCate: PropTypes.func,
  changeCate: PropTypes.func,
  hideDropdown: PropTypes.func,
};

function mapStateToProps(state) {
  const { cates, products, visibilityDropdown, pagination } = state;
  return {
    visibilityDropdown,
    activeCate: cates.activeCate,
    categories: cates.categories,
    navLeft: cates.navLeft,
    products,
    pagination,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRebatesIfNeeded,
    toggleDropdown,
    changeCate,
    moveCate,
    hideDropdown,
  }, dispatch);
}

// connect() 的唯一参数是 selector。
// 此方法可以从 Redux store 接收到全局的 state，然后返回组件中需要的 props。
// 最简单的情况下，可以返回一个初始的 state （例如，返回认证方法），但最好先将其进行转化。
export default connect(mapStateToProps, mapDispatchToProps)(RebatePage);
