/**
 * @require BalanceDetail.less
 */
import React, { PropTypes } from 'react';

// <div className="u-credit">
//   <span>信用额度：</span>
//   <span>5000K币</span>
// </div>

function LoginUserInfo({ account }) {
  return (
    <div className="user">
      <img className="user-pic" src="../../../static/img/user_avatar_128.png" alt="" />
      <div className="user-info">
        <div className="name">{account.userInfo.nickName}</div>
        <div className="phone">13581837625</div>
        <div className="c-flex">
          <div className="u-level"><i></i>大众会员</div>
        </div>
      </div>
    </div>
  );
}
LoginUserInfo.propTypes = {
  account: PropTypes.object,
};


function UnloginUserInfo({ account }) {
  return (
    <div className="user">
      <img className="user-pic" src="../../../static/img/user_avatar_128.png" alt="" />
      <div className="user-info">
        <div className="name">未登陆用户</div>
        <div className="phone">&nbsp;</div>
        <div className="c-flex">
          <div className="u-level"><i></i>访客</div>
        </div>
      </div>
    </div>
  );
}

function Balance({ account }) {
  return (
    <div className="balance-info">
      <div className="b-avail">
        可用余额<b>（待确认：{account.balanceMajor.pendingAmount}K币 | 信用余额：{account.balanceMajor.pendingAmount}K币）</b>
      </div>
      <div className="b-amount">
        <div className="b-yuan">
          <strong>{account.balanceMajor.availableAmount}K币</strong>
        </div>
        <div className="b-withdraw">
          <a href="/fanliba/view/exchange">立即兑换&gt;</a>
        </div>
      </div>
    </div>
  );
}

function BalanceDetail({ account }) {
  return (
    <section className="account-wrap">
      <UnloginUserInfo account={account} />
      <Balance account={account} />
    </section>
  );
}

BalanceDetail.propTypes = {
  account: PropTypes.object,
};

export default BalanceDetail;
