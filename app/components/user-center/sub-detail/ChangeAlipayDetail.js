/**
 * @require ChangePhoneDetail.less
 */
import React from 'react';

const logoutStyles = {
  textAlign: 'center',
  padding: '0.8rem',
  fontSize: '32px',
};

function ChangePhoneDetail() {
  return (
    <div>
      <div className="bind-phone">
        <span>您当前绑定的手机号：</span>
        <span>135****3456</span>
      </div>
      <div className="p-group">
        <div className="form-group">
          <div className="f-field valid-code">
            <input type="text" placeholder="请输入短信验证码" name="validCode" /><a data-validating="false">获取验证码</a>
          </div>
        </div>
      </div>
      <div className="p-group">
        <div className="p-group-body">
          <div style={logoutStyles}>
            <a href="#">下一步</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePhoneDetail;
