import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckTab from '../components/login/CheckTab';
import LoginForm from '../components/login/LoginForm';
import RegisterForm from '../components/login/RegisterForm';
import $ from '../../node_modules/jquery/dist/jquery.min.js';
import Modal from '../../dep/modal/react-modal.min.js';

import { changeTab, toggleModal, regError } from '../actions/login.js';

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    WebkitTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
    borderRadius: '10px',
    width: '80%',
  },
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleClickTab = this.handleClickTab.bind(this);
    this.submitReg = this.submitReg.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  handleClickTab(selectedIndex) {
    this.props.dispatch(changeTab(selectedIndex));
  }
  handleModalOpen(content) {
    this.props.dispatch(toggleModal(true, content));
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
  }
  closeModal(e) {
    e.preventDefault();
    this.props.dispatch(toggleModal(false, ''));
    // this.setState({modalIsOpen: false});
  }
  submitLogin(formData) {
    $.ajax({
      url: '/fanliba/v1/user?__method=put',
      dataType: 'json',
      data: {
        app: window.C_APP,
        sid: window.SID,
        request: JSON.stringify(formData),
      }
    }).done((data) => {
      if (data.err_no === 0) {
        // TODO 登录成功;
        window.location.href = '/fanliba/view/profile';
      } else {
        this.props.dispatch(toggleModal(true, data.err_msg));
      }
    }).fail(() => {
      this.props.dispatch(toggleModal(true, '登录失败！'));
    });
  }
  submitReg(formData) {
    // 发送ajax表单
    $.ajax({
      url: '/fanliba/v1/user',
      type: 'POST',
      dataType: 'json',
      data: {
        app: window.C_APP,
        sid: window.SID,
        request: JSON.stringify(formData),
      },
    }).done((data) => {
      // 注册成功, 跳转到首页
      if (data.err_no === 0) {
        // TODO 注册成功;
        window.location.href = '/fanliba/view/profile';
      } else {
        this.props.dispatch(toggleModal(true, data.err_msg));
      }
    }).fail(() => {
      this.props.dispatch(toggleModal(true, '注册失败！'));
    });
  }
  render() {
    const { selectedIndex, modal, regError } = this.props;
    return (
      <div>
        <CheckTab changeTab={this.handleClickTab} selectedIndex={selectedIndex} />
        <div className="form-wrap">
          <LoginForm showError={this.handleModalOpen} submitLogin={this.submitLogin} selectedIndex={selectedIndex} />
          <RegisterForm showError={this.handleModalOpen} submitReg={this.submitReg} selectedIndex={selectedIndex} />
        </div>
        <Modal
          isOpen={modal.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}>
          <div className="modal-body">
            <div className="modal-content">
              {modal.content}
            </div>
          </div>
          <div className="modal-foot">
            <a onClick={this.closeModal}>确定</a>
          </div>
        </Modal>
      </div>
    );
  }
}

LoginPage.defaultProps = {
  modal: {
    modalIsOpen: false,
    content: '',
  },
  regError: '',
};

function mapStateToProps(state) {
  const { selectedIndex, modal } = state;
  return { selectedIndex, modal, regError };
}

export default connect(mapStateToProps)(LoginPage);
