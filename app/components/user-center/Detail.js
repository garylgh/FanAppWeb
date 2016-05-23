import React, { Component, PropTypes } from 'react';
import {
	Container,
	Group,
	NavBar,
	TabBar,
	View,
} from 'amazeui-touch';
import { Link } from 'react-router';

import Components from './sub-detail';

const NotFound = React.createClass({
	render() {
		return (
			<Group header="404">
				<h2>Not found.</h2>
			</Group>
		);
	}
});

class Detail extends Component {
	render() {
		const { dispatch, account, orders } = this.props;
		let component = this.props.params.component;

		if (component) {
			component = component.charAt(0).toUpperCase() + component.slice(1);
		}

		let Component = Components[component] || NotFound;
		let componentTitle = Components[`${component}Name`];
		let backNav = {
			component: Link,
			icon: 'left-nav',
			title: '返回',
			to: '/app/page/profile/'
		};

		return (
			<View id="sk-detail">
				<NavBar
					title={componentTitle}
					leftNav={[backNav]}
					amStyle="primary"
				/>
			<Component scrollable dispatch={dispatch} account={account} orders={orders} className="sk-demos" />
			</View>
		);
	}
}

// <Component scrollable className="sk-demos"/>
export default Detail;
