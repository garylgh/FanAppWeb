import React, { Component, PropTypes } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadAccount } from '../actions/profile.js';
import { Container } from 'amazeui-touch';

class ProfilePage extends Component {
  componentWillMount() {
    this.props.dispatch(loadAccount());
  }
  render() {
    // 此处的children是根据route path确定的对应的component
    const { dispatch, children, account } = this.props;
    let transition = 'sfr';
    if (!account.T) {
      return null;
    }

    return (
      <Container direction="column" id="sk-container">
        <Container transition={transition}>
          {React.cloneElement(children, { dispatch, account })}
        </Container>
      </Container>
    );
  }
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  orders: PropTypes.object,
};

function mapStateToProps(state) {
  const { account } = state;
  return { account };
}

export default connect(mapStateToProps)(ProfilePage);
