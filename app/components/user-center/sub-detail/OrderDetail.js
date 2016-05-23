/**
 * 提现记录页面
 */

import React, { Component, PropTypes } from 'react';
import {
    Container,
} from 'amazeui-touch';
import { loadOrders } from '../../../actions/profile.js'

class OrderDetail extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        console.log(this.props.account.iid);
        this.props.dispatch(loadOrders(this.props.account.iid))
    }
    render() {
        return (
            <Container {...this.props}>
                <div> This is Order !!! </div>
            </Container>
        )
    }
}

export const OrderName = '订单记录';

export default OrderDetail;
