/**
 * @require ChangePhoneDetail.less
 */
import React, { Component } from 'react';
import $ from '../../../../node_modules/jquery/dist/jquery.min.js';
import { Link } from 'react-router';

const logoutStyles = {
  textAlign: 'center',
  padding: '0.8rem',
  fontSize: '32px',
};

class ChangePhoneDetail extends Component {
  constructor(props) {
    super(props);
    this.handleValidCode = this.handleValidCode.bind(this);
  }
  handleValidCode(e) {
    e.preventDefault();
    const { account } = this.props;
    const userInfo = account.userInfo || {};
    const linkDom = this.refs.vcLink;
    if (linkDom.dataset.validating === 'true') {
      return false;
    }

    // 判断是否填写手机号
    // if (!this.refs.mobile.value) {
    //   this.props.showError('手机号不能为空');
    //   return false;
    // }

    $.get('/fanliba/v1/reqsms', { mobile: userInfo.mobile });
    let start = 60;
    linkDom.dataset.validating = 'true';
    const cdInterval = setInterval(() => {
      linkDom.innerHTML = `重新获取${start--}`;
      linkDom.style.color = '#c1c1c1';
      if (start === 0) {
        clearInterval(cdInterval);
        linkDom.innerHTML = '获取验证码';
        linkDom.style.color = '#333';
        linkDom.dataset.validating = 'false';
      }
    }, 1000);
  }
  // enable 下一步按钮

  render() {
    const { account } = this.props;
    const userInfo = account.userInfo || {};
    return (
      <div>
        <div className="bind-phone">
          <span>您当前绑定的手机号：</span>
          <span>{userInfo.mobile ? userInfo.mobile : ''}</span>
        </div>
        <div className="p-group">
          <div className="form-group">
            <div className="f-field valid-code">
              <input type="text" placeholder="请输入短信验证码" name="validCode" />
              <a ref="vcLink" data-validating="false" onClick={this.handleValidCode}>获取验证码</a>
            </div>
          </div>
        </div>
        <div className="p-group">
          <div className="p-group-body">
            <div style={logoutStyles}>
              <Link to="newPhone">
                下一步
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePhoneDetail;
