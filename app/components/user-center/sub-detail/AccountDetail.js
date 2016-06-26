import React, { Component, PropTypes } from 'react';
import { Container } from 'amazeui-touch';
import { loadOrders, changeOrderTab } from '../../../actions/profile.js';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import $ from '../../../../node_modules/jquery/dist/jquery.min.js';

const logoutStyles = {
  textAlign: 'center',
  padding: '0.8rem',
  fontSize: '32px',
};

class AccountDetail extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    const { account } = this.props;
    const userInfo = account.userInfo;
    const uid = userInfo ? userInfo.iid : '';
    $.ajax({
      url: '/fanliba/v1/user?__method=delete',
      type: 'DELETE',
      dataType: 'json',
      data: {
        app: window.C_APP,
        sid: window.SID,
        uid,
      },
    }).done((data) => {
      window.location.href = `/fanliba/view/profile?app=${window.C_APP}&sid=${window.SID}`;
    }).fail(() => {
      // window.location.href = '/';
      alert('退出登录失败！');
      // this.props.dispatch(toggleModal(true, '登录失败！'));
    });
  }
  render() {
    const { account } = this.props;
    let query;
    if (account.userInfo) {
      query = { mobile: account.userInfo.mobile };
    }

    return (
      <div>
        <div className="p-group">
          <div className="p-group-body">
            <ul className="p-list">
              <li className="p-item">
                <Link to="changePhone" query={query}>
                  <h3 className="item-title">
                    <span className="icon icon-right-nav item-icon"></span>修改手机号
                  </h3>
                  <span>已绑定</span>
                  <span className="icon icon-right-nav item-icon"></span>
                </Link>
              </li>
              <li className="p-item">
                <Link to="changePhone">
                  <h3 className="item-title">
                    <span className="icon icon-right-nav item-icon"></span>修改支付宝账号
                  </h3>
                  <span>已绑定</span>
                  <span className="icon icon-right-nav item-icon"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-group">
          <div className="p-group-body">
            <div style={logoutStyles}>
              <a onClick={this.handleLogout}>退出当前账号</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountDetail;
