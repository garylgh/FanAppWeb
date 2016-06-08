/**
 * @require WithdrawDetail.less
 * 提现记录页面
 */

import React, { Component, PropTypes } from 'react';
import {
    Container,
} from 'amazeui-touch';
import TabMenu from './TabMenu.js';
import { connect } from 'react-redux';
import { shouldFetchWithdraws, loadWithdraws, changeWithdrawTab } from '../../../actions/profile.js';

function WithdrawItem({ data }) {
  return (
    <li className="wd-item">
      <div className="c-flex wd-row">
        <div className="box wd-desc">{data.info}</div>
        <div className="box wd-reward">+{data.amountStr}</div>
      </div>
      <div className="c-flex wd-row">
        <div className="box wd-date">{data.date}</div>
        <div className="box wd-status">{data.statusStr}</div>
      </div>
    </li>
  );
}

function WithdrawList({ datas }) {
  if (!datas) {
    return null;
  }
  let withdrawItems = datas.map(o => (<WithdrawItem data={o} />));
  return (
    <ul>
      {withdrawItems}
    </ul>
  );
}

class WithdrawDetail extends Component {
  constructor(props) {
    super(props);
    this.handleClickTab = this.handleClickTab.bind(this);
  }
  componentWillMount() {
    const { dispatch, account, withdraws } = this.props;
    const currPage = withdraws.pagination[withdraws.selectedIndex];
    if (shouldFetchWithdraws(currPage, withdraws.selectedIndex, 1)) {
      dispatch(loadWithdraws(account.iid, withdraws.selectedIndex));
    }
  }
  handleClickTab(selectedIndex) {
    this.props.dispatch(changeWithdrawTab(this.props.account.iid, selectedIndex));
  }
  render() {
    const { withdraws, infos } = this.props;
    const currentWithdraws = withdraws.withdrawDict[withdraws.selectedIndex];
    return (
      <Container {...this.props}>
        <TabMenu selectedIndex={withdraws.selectedIndex} clickTab={this.handleClickTab} infos={infos} />
        <WithdrawList datas={currentWithdraws} />
      </Container>
    );
  }
}

WithdrawDetail.defaultProps = {
  infos: [{
    index: 0,
    title: '收入明细',
  }, {
    index: 1,
    title: '支出明细',
  }],
};

// export const WithdrawName = '提取记录';
// export default WithdrawDetail;
function mapStateToProps(state) {
  const { account, withdraws } = state;
  return { account, withdraws };
}

export default connect(mapStateToProps)(WithdrawDetail);
