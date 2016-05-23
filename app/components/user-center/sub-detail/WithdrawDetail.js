/**
 * @require WithdrawDetail.less
 * 提现记录页面
 */

import React, { Component, PropTypes } from 'react';
import {
    Container,
} from 'amazeui-touch';

function loadWithdraw(installId) {

}

class WithdrawDetail extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }
    render() {
        return (
            <Container {...this.props}>
                <div> This is Withdraw!!! </div>
            </Container>
        )
    }
}

export const WithdrawName = '提取记录';

export default WithdrawDetail;
