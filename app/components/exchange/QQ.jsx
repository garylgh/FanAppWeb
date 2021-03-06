/**
 * @require exchange.less
 */
import React, { Component, PropTypes } from 'react';

class QQ extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        // TODO 验证表单有效性

        // 发送post请求
        const { query } = this.props;
        this.props.submitExchange({
            drawInfo: {
                productId: query.iid,
                amount: 1,
                type: query.type,
                info_1: this.refs.info_1.value,
                info_2: this.refs.info_2.value,
            },
        });
    }
    render() {
        const { query } = this.props;
        let btnDom;
        if (query.stock > 0) {
            btnDom = (<a className="exchange-btn" onClick={this.handleClick}>立刻兑换</a>);
        } else {
            btnDom = (<a className="exchange-btn no-stock" >立刻兑换</a>);
        }
        return (
            <div className="lcontainer">
                <form>
                    <div className="form-group inner-group">
                        <label>QQ号</label>
                        <input type="text" ref="info_1" placeholder="QQ号" />
                    </div>
                    <div className="form-group inner-group">
                        <label>QQ号确认</label>
                        <input type="text" placeholder="确认QQ号" />
                    </div>
                    <div className="form-group inner-group">
                        <label>附言信息</label>
                        <input type="text" ref="info_2" placeholder="有啥要告诉我们的？(可空)" />
                    </div>
                    <div className="form-group">
                        <div className="account">兑换金额：<em>{query.grossPrice}元</em></div>
                        <div className="account">当前库存：<em>{query.stock}</em></div>
                    </div>
                    <div className="form-group">
                        <div className="s2">需要金币: <em>{query.coin}个</em></div>
                        <div className="s2">我的金币: <em>{query.availableCoin}个</em></div>
                    </div>
                    <div className="form-group">
                        {btnDom}
                    </div>
                </form>
            </div>
        );
    }
}

QQ.defaultProps = {
};

QQ.propTypes = {
    query: PropTypes.object.isRequired,
};

export default QQ;
