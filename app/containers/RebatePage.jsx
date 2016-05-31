import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CateNav from '../components/rebate/CateNav.jsx';
// import ProductList from '../components/rebate/ProductList.jsx';
import { fetchRebatesIfNeeded, toggleDropdown, changeCate, moveCate, hideDropdown } from '../actions/rebate.js';

// 任何一个从 connect() 包装好的组件都可以得到一个 dispatch 方法作为组件的 props，
// 以及得到全局 state 中所需的任何内容。
// 通过调用 connect() 注入:
class RebatePage extends Component {
  constructor(props) {
    super(props);
    // 从url里头拿activeCate
    this.handleCateClick = this.handleCateClick.bind(this);
    this.handleCateMove = this.handleCateMove.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleCoverClick = this.handleCoverClick.bind(this);
  }
  /**
   * Invoked once, immediately before the initial rendering occurs.
   * If you call setState within this method, render() will see the updated state
   * and will be executed only once despite the state change.
   */
  componentWillMount() {
    const { params } = this.props;
    const activeCate = params.cateId ? parseInt(params.cateId, 10) : window.ALL_CATE_ID; // 26是默认的全部
    this.props.changeCate(activeCate);
  }
  /**
   * Invoked once, immediately after the initial rendering occurs.
   * At this point in the lifecycle, you can access any refs to your children.
   * The componentDidMount() method of child components is invoked before that of parent components.
   */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  /**
   * Invoked when a component is receiving new props. This method is not called for the initial render.
   * Use this as an opportunity to react to a prop transition before render() is called
   * by updating the state using this.setState()
   * Calling this.setState() within this function will not trigger an additional render.
   * It will be called if props change.
   */
  componentWillReceiveProps() {
  }
  /**
   * Invoked before rendering when new props or state are being received.
   * This method is not called for the initial render or when forceUpdate is used.
   * Use this as an opportunity to return false when you're certain
   * that the transition to the new props and state will not require a component update.
   *
   * If shouldComponentUpdate returns false, then componentWillUpdate and componentDidUpdate will not be called.
   */
  shouldComponentUpdate() {
    return true;
  }
  /**
   * Invoked immediately before rendering when new props or state are being received.
   * This method is not called for the initial render.
   *
   * You cannot use this.setState() in this method.
   * If you need to update state in response to a prop change, use componentWillReceiveProps instead.
   */
  componentWillUpdate() {
  }
  /**
   * Invoked immediately after the component's updates are flushed to the DOM.
   * This method is not called for the initial render.
   * Use this as an opportunity to operate on the DOM when the component has been updated.
   */
  componentDidUpdate() {
  }
  /**
   * Invoked immediately before a component is unmounted from the DOM.
   * Perform any necessary cleanup in this method,
   * such as invalidating timers or cleaning up any DOM elements that were created in componentDidMount.
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  // 点击cate事件
  handleCateClick(cateId, navLeft) {
		// TODO move cate
    this.props.moveCate(true, navLeft);
    this.props.changeCate(parseInt(cateId, 10));
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
      this.props.fetchRebatesIfNeeded(this.props.activeCate, currPage ? (currPage + 1) : 1);
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
      children,
		} = this.props;

    const activeProducts = products[activeCate] || [];
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
        {React.cloneElement(children, {
          key: location.key,
          query: location.query,
          products: activeProducts,
        })}
      </div>
    );
  }
}

RebatePage.propTypes = {
	// 握草，居然是func，不是function
  dispatch: PropTypes.func,
  visibilityDropdown: PropTypes.bool.isRequired,
  activeCate: PropTypes.number,
  children: PropTypes.element.isRequired,
  categories: PropTypes.array.isRequired,
  products: PropTypes.object.isRequired,
  navLeft: PropTypes.number,
  pagination: PropTypes.object.isRequired,
  moveCate: PropTypes.func,
  changeCate: PropTypes.func,
  hideDropdown: PropTypes.func,
  fetchRebatesIfNeeded: PropTypes.func,
};

function mapStateToProps(state) {
  const { cates, products, visibilityDropdown, pagination } = state;
  return {
    visibilityDropdown,
    activeCate: cates.activeCate,
    navLeft: cates.navLeft,
    categories: cates.categories,
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
