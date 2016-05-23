import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadAccount } from '../actions/profile.js';

import {
	Container,
	Group,
	NavBar,
	TabBar,
	View,
} from 'amazeui-touch';

function loadData(props) {
	props.loadAccount();
}

class ProfilePage extends Component {
    componentWillMount() {
		this.props.dispatch(loadAccount());
        // loadData(this.props);
    }
    render() {
		// 此处的children是根据route path确定的对应的component
        const { dispatch, children, account, orders } = this.props;
		let transition = 'sfr';
		if (!account.userInfo) {
			return (<h2>Loading</h2>)
		}

        return (
			<Container direction="column" id="sk-container">
				<Container transition={transition}>
					{ React.cloneElement(children, {account, orders, dispatch}) }
				</Container>
			</Container>
        );
    }
}

function mapStateToProps(state) {
    const { account, orders } = state;
    return {
        account,
		orders,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loadAccount }, dispatch);
}

export default connect(mapStateToProps)(ProfilePage);
