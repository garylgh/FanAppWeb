/**
 * 提现记录页面
 * @require OrderDetail.less
 */

import React, { Component, PropTypes } from 'react';
import { Container } from 'amazeui-touch';
import { shouldFetchOrders, loadOrders, changeOrderTab } from '../../../actions/profile.js';
import TabMenu from './TabMenu.js';
import { connect } from 'react-redux';

function OrderItem({ order }) {
  const rebateStatus = order.rebateStatus === 0 ? '未返利' : '已返利';
  return (
    <li className="or-item">
      <div className="c-flex box or-serial">
        <div className="">单号：<span>{order.srcId}</span></div>
        <div>一号店</div>
      </div>
      <div className="or-product">
        <div className="c-flex box op-title">
          <div>{order.orderDesc}</div>
          <div>￥{order.orderAmount}</div>
        </div>
        <div className="op-rebate">
          返：{order.rebateAmount}K币
        </div>
      </div>
      <div className="c-flex box or-status">
        <div className="">跟单：<span>{order.receiveDate}</span></div>
        <div>{rebateStatus}</div>
      </div>
    </li>
  );
}

function OrderList({ orders }) {
  if (!orders) {
    return null;
  }
  let orderItems = orders.map(o => (<OrderItem order={o} />));
  return (
    <ul>
      {orderItems}
    </ul>
  );
}

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.handleClickTab = this.handleClickTab.bind(this);
  }
  componentWillMount() {
    const { dispatch, orders } = this.props;

    const currPage = orders.pagination[orders.selectedIndex];
    if (shouldFetchOrders(currPage, orders.selectedIndex, 1)) {
      dispatch(loadOrders(orders.selectedIndex));
    }
  }
  handleClickTab(selectedIndex) {
    this.props.dispatch(changeOrderTab(window.SID, selectedIndex));
  }
  render() {
    const { orders, infos } = this.props;
    const currentOrders = orders.orderDict[orders.selectedIndex];
    return (
      <Container {...this.props}>
        <TabMenu selectedIndex={orders.selectedIndex} clickTab={this.handleClickTab} infos={infos} />
        <OrderList orders={currentOrders} />
      </Container>
    );
  }
}

OrderDetail.defaultProps = {
  infos: [{
    index: 0,
    title: '全部订单',
  }, {
    index: 1,
    title: '待返订单',
  }],
};

OrderDetail.propTypes = {
  dispatch: PropTypes.func,
  orders: PropTypes.object,
};

// export const OrderName = '订单记录';

function mapStateToProps(state) {
  const { orders } = state;
  return { orders };
}

export default connect(mapStateToProps)(OrderDetail);
// export default OrderDetail;
