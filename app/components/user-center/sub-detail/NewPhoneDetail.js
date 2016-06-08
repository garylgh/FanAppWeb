import React, { Component } from 'react';
import $ from '../../../../node_modules/jquery/dist/jquery.min.js';

const logoutStyles = {
  textAlign: 'center',
  padding: '0.8rem',
  fontSize: '32px',
};
class NewPhoneDetail extends Component {
  constructor(props) {
    super(props);
    this.handleValidCode = this.handleValidCode.bind(this);
  }
  handleValidCode(e) {
    e.preventDefault();
    const linkDom = this.refs.vcLink;
    if (linkDom.dataset.validating === 'true') {
      return false;
    }

    // 判断是否填写手机号
    // if (!this.refs.mobile.value) {
    //   this.props.showError('手机号不能为空');
    //   return false;
    // }

    $.get('/fanliba/v1/reqsms', { mobile: '13581837625' });
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
  render() {
    return (
      <div>
        <div className="p-group">
          <div className="form-group">
            <div className="f-field">
              <input className="new-phone" type="text" placeholder="请输入新手机号" name="newPhone" />
            </div>
          </div>
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
              <a href="#">提交</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPhoneDetail;
