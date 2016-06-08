import React, { Component, PropTypes } from 'react';
import { Container, Group, NavBar, TabBar, View } from 'amazeui-touch';
import { Link } from 'react-router';
import { connect } from 'react-redux';

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
    const { dispatch, account } = this.props;
    let component = this.props.params.component;

    if (component) {
      component = component.charAt(0).toUpperCase() + component.slice(1);
    }

    let SubDetail = Details[component] || NotFound;

    return (
      <View id="sk-detail">
        <SubDetail scrollable dispatch={dispatch} account={account} className="sk-demos" />
      </View>
    );
  }
}

export default Detail;
