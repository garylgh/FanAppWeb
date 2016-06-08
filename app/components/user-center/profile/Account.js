import React, { PropTypes } from 'react';
import BalanceDetail from './BalanceDetail.js';
import ProfileDetail from './ProfileDetail.js';
import { connect } from 'react-redux';

import { Container, List, NavBar, Group, View } from 'amazeui-touch';

function Account({ account }) {
  return (
    <View id="app-index" className="profile-wrap">
      <BalanceDetail account={account} />
      <ProfileDetail account={account} />
    </View>
  );
}

Account.propTypes = {
  account: PropTypes.object,
};

// export default Account;

function mapStateToProps(state) {
  const { account } = state;
  return { account };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     loadAccount,
//   }, dispatch);
// }

export default connect(mapStateToProps)(Account);
