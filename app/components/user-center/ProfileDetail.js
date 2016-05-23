/**
 * @require ProfileDetail.less
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function ProfileDetail() {
    return (
        <section className="group-wrap">
            <div className="p-group">
                <div className="p-group-body">
                    <ul className="p-list">
                        <li className="p-item">
                            <Link to="/app/page/profile/order" >
                                <h3 className="item-title">订单查询</h3>
                                <span className="icon icon-right-nav item-icon"></span>
                            </Link>
                        </li>
                        <li className="p-item">
                            <a href="/app/page/profile/withdraw">
                                <h3 className="item-title">兑换记录</h3>
                                <span className="icon icon-right-nav item-icon"></span>
                            </a>
                        </li>
                        <li className="p-item">
                            <a href="#/haha">
                                <h3 className="item-title">账户设置</h3>
                                <span className="icon icon-right-nav item-icon"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="p-group">
                <div className="p-group-body">
                    <ul className="p-list">
                        <li className="p-item">
                            <a href="#/accordion">
                                <h3 className="item-title">常见问题</h3>
                                <span className="icon icon-right-nav item-icon"></span>
                            </a>
                        </li>
                        <li className="p-item">
                            <a href="#/accordion">
                                <h3 className="item-title">联系客服</h3>
                                <span className="icon icon-right-nav item-icon"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default ProfileDetail;
