import React, { Component, PropTypes } from 'react';
import { Container, Group, NavBar, TabBar, View } from 'amazeui-touch';
import { Link } from 'react-router';

import Details from './sub-detail';

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

    let SubDetail = Details[component] || NotFound;
    // let componentTitle = Details[`${component}Name`];
    // let backNav = {
    //   component: Link,
    //   icon: 'left-nav',
    //   title: '返回',
    //   to: '/'
    // };

    return (
      <View id="sk-detail">
        <SubDetail scrollable dispatch={dispatch} account={account} orders={orders} className="sk-demos" />
      </View>
    );
  }
}

// <Component scrollable className="sk-demos"/>
export default Detail;
