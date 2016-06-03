/**
 * @require BalanceDetail.less
 */
import React, { PropTypes } from 'react';

function BalanceDetail({ account }) {
  return (
    <section className="account-wrap">
      <div className="user-info">
        <img className="user-pic" src="../../../static/img/user_avatar_128.png"/>
        <span className="user-name">{account.userInfo.nickName}</span>
      </div>
      <div className="balance-info">
        <div className="b-avail">可用返利<b>（等待确认：{account.balanceMajor.pendingAmount}）</b>
        </div>
        <div className="b-amount">
          <div className="b-yuan">
            <strong>{account.balanceMajor.availableAmount}</strong>元</div>
          <div className="b-withdraw">
            <button>提现</button>
          </div>
        </div>
      </div>
    </section>
  );
}

BalanceDetail.propTypes = {
  account: PropTypes.object,
};

export default BalanceDetail;
