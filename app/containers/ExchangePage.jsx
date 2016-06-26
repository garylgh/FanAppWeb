import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProductList from '../components/rebate/ProductList.jsx';
import { fetchExchangeIfNeeded } from '../actions/exchange.js';
import $ from '../../node_modules/jquery/dist/jquery.min.js';

const barStyles = {
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
};

function DescBar() {
  return (
    <section style={barStyles}>
      <div style={keyStyles}>大家都在兑</div>
    </section>
  );
}

export class App extends Component {
  submitExchange(formData) {
    $.ajax({
      url: '/fanliba/v1/withdraw',
      type: 'POST',
      dataType: 'JSON',
      data: {
        request: JSON.stringify(formData),
      },
    }).done((data) => {
      console.log("success");
    }).fail(() => {
      console.log("error");
    }).always(() => {
      console.log(' always ......... ');
    });
  }
  render() {
    let {
      location,
      params,
      children,
      ...props,
    } = this.props;
    return (
      <div>
        {React.cloneElement(children, {
          key: location.key,
          query: location.query,
          submitExchange: this.submitExchange,
        })}
      </div>
    );
  }
}

class ExchangePage extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  handleScroll(e) {
    const threshold = 300;
    const scrollTop = document.body.scrollTop;
    const winHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    // 判断isLoading状态，
    if (!this.props.products.isLoading && (scrollHeight - winHeight - scrollTop) <= threshold) {
      let currPage = this.props.products.pagination;
      this.props.dispatch(fetchExchangeIfNeeded(currPage ? (currPage + 1) : 1));
    }
  }
  componentWillMount() {
    this.props.dispatch(fetchExchangeIfNeeded(this.props.products.pagination));
    // loadData(this.props, this.props.pagination[this.props.activeCate]);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  render() {
    const { products } = this.props;
    return (
      <div>
        <DescBar />
        <ProductList products={products.list} itemType="exchange" />
      </div>
    );
  }
}

ExchangePage.defaultProps = {
  products: {
    list: [],
    pagination: 1,
    isLoading: false,
  },
};

ExchangePage.propTypes = {
  dispatch: PropTypes.func,
  products: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const { products } = state;
  return { products };
}

export default connect(mapStateToProps)(ExchangePage);
