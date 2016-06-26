import React, { PropTypes } from 'react';
import BalanceDetail from './profile/BalanceDetail.js';
import ProfileDetail from './profile/ProfileDetail.js';
import { connect } from 'react-redux';

import { View } from 'amazeui-touch';

function Account({ dispatch, account, modal }) {
  return (
    <View id="app-index" className="profile-wrap">
      <BalanceDetail dispatch={dispatch} account={account} modal={modal} />
      <ProfileDetail dispatch={dispatch} account={account} modal={modal} />
    </View>
  );
}

Account.propTypes = {
  dispatch: PropTypes.func,
  account: PropTypes.object,
  modal: PropTypes.object,
};

// export default Account;

function mapStateToProps(state) {
  const { account, modal } = state;
  return {
    account,
    modal,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     loadAccount,
//   }, dispatch);
// }

export default connect(mapStateToProps)(Account);
