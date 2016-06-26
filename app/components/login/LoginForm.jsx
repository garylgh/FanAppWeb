import React, { Component, PropTypes } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const formData = {
      mobile: this.refs.mobile.value,
      password: this.refs.password.value,
    };
    if (!formData.mobile) {
      this.props.showError('手机号不能为空');
      return;
    }
    if (!formData.password) {
      this.props.showError('密码不能为空');
      return;
    }
    this.props.submitLogin(formData);
  }
  render() {
    const { selectedIndex } = this.props;
    return (
      <div className={selectedIndex == 1 ? 'active' : ''} id="loginForm" data-index="1">
        <form className="lr-form">
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
        </form>
        <div className="submit-btn">
          <a onClick={this.handleSubmit}>登录</a>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  submitLogin: PropTypes.func,
  showError: PropTypes.func.isRequired,
  selectedIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default LoginForm;
