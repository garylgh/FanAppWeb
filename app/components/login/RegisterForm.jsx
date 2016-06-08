import React, { Component, PropTypes } from 'react';
import $ from '../../../node_modules/jquery/dist/jquery.min.js';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidCode = this.handleValidCode.bind(this);
  }
  // TODO time left
  handleSubmit() {
    const formData = {
      mobile: this.refs.mobile.value,
      password: this.refs.password.value,
      code: this.refs.validCode.value,
    };
    if (!formData.mobile) {
      this.props.showError('手机号不能为空');
      return;
    }
    if (!formData.password) {
      this.props.showError('密码不能为空');
      return;
    }
    if (!formData.code) {
      this.props.showError('验证码不能为空');
      return;
    }
    this.props.submitReg(formData);
  }
  handleValidCode(e) { // 懒得用react写了
    e.preventDefault();
    const linkDom = this.refs.vcLink;
    if (linkDom.dataset.validating === 'true') {
      return false;
    }

    // 判断是否填写手机号
    if (!this.refs.mobile.value) {
      this.props.showError('手机号不能为空');
      return false;
    }

    $.get('/fanliba/v1/reqsms', { mobile: this.refs.mobile.value });
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
    const { selectedIndex } = this.props;
    return (
      <div className={selectedIndex == 0 ? 'active' : ''} id="registerForm" data-index="0">
        <form className="lr-form" ref="regForm">
          <div className="form-group">
            <div className="icon-label">
              <i className="icon"></i>
            </div>
            <input className="f-field" ref="mobile" type="text" placeholder="手机号" name="mobile" />
          </div>
          <div className="form-group">
            <div className="icon-label">
              <i className="icon"></i>
            </div>
            <input className="f-field" ref="password" type="password" placeholder="密码" name="password" />
          </div>
          <div className="form-group">
            <div className="icon-label">
              <i className="icon"></i>
            </div>
            <div className="f-field valid-code">
              <input type="text" ref="validCode" placeholder="验证码" name="validCode" />
              <a ref="vcLink" onClick={this.handleValidCode} data-validating="false">获取验证码</a>
            </div>
          </div>
        </form>
        <div className="submit-btn">
          <a onClick={this.handleSubmit}>注册</a>
        </div>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  submitReg: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  selectedIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default RegisterForm;
