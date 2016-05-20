import React, { Component, PropTypes } from 'react';
import {
	Container,
	Group,
	NavBar,
	TabBar,
	View,
} from 'amazeui-touch';
import { Link } from 'react-router';

function backLink() {
    return (
        <Link>This is haha!</Link>
    )
}

class Detail extends Component {
	render() {
		let component = this.props.params.component;

		console.log('component = ' + component);
		//
		// if (component) {
		// 	component = component.charAt(0).toUpperCase() + component.slice(1);
		// }
		//
		// let Component = Components[component] || NotFound;
		let backNav = {
			component: Link,
			icon: 'left-nav',
			title: '返回',
			to: '/app/page/profile/'
		};

		return (
			<View id="sk-detail">
				haha
				<NavBar
					title="aaaa"
					leftNav={[backNav]}
					amStyle="primary"
				/>
			</View>
		);
	}
}

// <Component scrollable className="sk-demos"/>
export default Detail;
