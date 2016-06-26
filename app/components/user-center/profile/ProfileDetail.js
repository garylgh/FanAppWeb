/**
 * @require ProfileDetail.less
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function ProfileDetail() {
  function handleRate(e) {
    e.preventDefault();
    if (window.WebViewJavascriptBridge) {
      window.WebViewJavascriptBridge.callHandler('rateApp', null);
    } else {
      alert('鼓励失败');
    }
  }
  return (
    <section className="group-wrap">
      <div className="p-group">
        <div className="p-group-body">
          <ul className="p-list">
            <li className="p-item">
              <Link to="order">
                <h3 className="item-title">订单查询</h3>
                <span className="icon icon-right-nav item-icon"></span>
              </Link>
            </li>
            <li className="p-item">
              <Link to="withdraw">
                <h3 className="item-title">余额明细</h3>
                <span className="icon icon-right-nav item-icon"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-group">
        <div className="p-group-body">
          <ul className="p-list">
            <li className="p-item">
              <Link to="account">
                <h3 className="item-title">账号安全</h3>
                <span className="icon icon-right-nav item-icon"></span>
              </Link>
            </li>
            <li className="p-item">
              <Link to="accordion">
                <h3 className="item-title">邀请好友</h3>
                <span className="icon icon-right-nav item-icon"></span>
              </Link>
            </li>
            <li className="p-item">
              <a onClick={handleRate}>
                <h3 className="item-title">鼓励一下</h3>
                <span className="icon icon-right-nav item-icon"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-group">
        <div className="p-group-body">
          <ul className="p-list">
            <li className="p-item">
              <Link to="accordion">
                <h3 className="item-title">使用帮助</h3>
                <span className="icon icon-right-nav item-icon"></span>
              </Link>
            </li>
            <li className="p-item">
              <Link to="accordion">
                <h3 className="item-title">联系客服</h3>
                <span className="icon icon-right-nav item-icon"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ProfileDetail;
