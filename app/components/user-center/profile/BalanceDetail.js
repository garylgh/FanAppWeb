/**
 * @require BalanceDetail.less
 */
import React, { Component, PropTypes } from 'react';
import Modal from '../../../../dep/modal/react-modal.min.js';
import { toggleModal } from '../../../actions/profile.js';
import { Link } from 'react-router';

// <div className="u-credit">
//   <span>信用额度：</span>
//   <span>5000K币</span>
// </div>

function LoginUserInfo({ account, changeAvatar }) {
  return (
    <div className="user">
      <img className="user-pic" onClick={changeAvatar} src={account.userInfo.avatarUrl} alt="" />
      <div className="user-info">
        <div className="name">{account.userInfo.nickName || account.userInfo.account}</div>
        <div className="phone">{account.userInfo.mobile}</div>
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


function UnloginUserInfo({ account, showLogin }) {
  return (
    <div className="user" onClick={showLogin}>
      <a className="to-login" href={`/fanliba/view/login?app=${window.C_APP}&sid=${window.SID}`} >
        <img className="user-pic" src="../../../static/img/user_avatar_128.png" alt="" />
        <div className="user-info">
          <div className="name">未登陆用户</div>
          <div className="phone">&nbsp;</div>
          <div className="c-flex">
            <div className="u-level"><i></i>访客</div>
          </div>
        </div>
      </a>
    </div>
  );
}

function Balance({ account }) {
  return (
    <div className="balance-info">
      <div className="b-avail">
        可用余额<b>（待确认：{account.balanceMajor.pendingAmount}K币）</b>
      </div>
      <div className="b-amount">
        <div className="b-yuan">
          <strong>{account.balanceMajor.availableAmount}K币</strong>
        </div>
        <div className="b-withdraw">
          <a href={`/fanliba/view/exchange?app=${window.C_APP}&sid=${window.SID}`}>立即兑换&gt;</a>
        </div>
      </div>
    </div>
  );
}

class BalanceDetail extends Component {
  constructor(props) {
    super(props);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.showLogin = this.showLogin.bind(this);
  }
  changeAvatar() {
    if (window.WebViewJavascriptBridge) {
      window.WebViewJavascriptBridge.callHandler('uploadAvatar', account.userId);
    } else {
      alert('无法上传头像！');
    }
  }
  handleModalOpen(content) {
    this.props.dispatch(toggleModal(true));
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
  }
  submitLogin(e) {
    e.preventDefault();
    // TODO 提交登陆表单
    this.props.dispatch(toggleModal(false));
  }
  showLogin() {
    this.props.dispatch(toggleModal(true));
  }
  render() {
    const { account, modal } = this.props;
    const customStyles = {
      content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
        borderRadius: '10px',
        width: '80%',
      },
    };
    let userInfo;
    if (account.userId == 0 && !account.userInfo) {
      userInfo = <UnloginUserInfo account={account} showLogin={this.showLogin} />;
    } else {
      userInfo = <LoginUserInfo account={account} changeAvatar={this.changeAvatar} />;
    }
    return (
      <div>
        <section className="account-wrap">
          {userInfo}
          <Balance account={account} />
        </section>
      </div>
    );
  }
}

// <Modal
//   isOpen={modal.modalIsOpen}
//   onAfterOpen={this.afterOpenModal}
//   onRequestClose={this.closeModal}
//   style={customStyles}>
//   <div className="modal-body" style={{ padding: 0 }}>
//     <div className="modal-content">
//       <form className="login-form">
//         <div className="form-group">
//           <input className="lfield" placeholder="输入用户名" type="text" name="userName" />
//         </div>
//         <div className="form-group">
//           <input className="lfield" placeholder="输入密码" type="password" name="password" />
//         </div>
//       </form>
//     </div>
//   </div>
//   <div className="modal-foot">
//     <a className="submit-btn" onClick={this.submitLogin}>提交</a>
//   </div>
// </Modal>

BalanceDetail.propTypes = {
  account: PropTypes.object,
  modal: PropTypes.object,
};

export default BalanceDetail;
