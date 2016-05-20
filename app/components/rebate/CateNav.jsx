/**
 * @require CateNav.less
 */

import React, { Component, PropTypes } from 'react';
import Cate from './Cate.jsx';

class CateNav extends Component {
    constructor(props) {
		super(props);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);

        this.moveData = {
            originLeft: 0,
            startX: 0, // 按下位置
            width: 0,
            parentWidth: 0,
        };
    }
    // 触屏开始
    handleTouchStart(e){
        const event = e || window.event;
        this.moveData.startX = event.touches[0].pageX;
        this.moveData.originLeft = this.props.navLeft;
        this.moveData.width = this.refs.mainNav.offsetWidth;
        this.moveData.parentWidth = this.refs.mainNav.parentNode.offsetWidth;
    }

    // 触屏滑动
    handleTouchMove(e){
        e.preventDefault();
        const event = e || window.event;
        const nowX = event.touches[0].pageX;
        const offsetX = nowX - this.moveData.startX;
        const navLeft = this.moveData.originLeft + offsetX;
        if (navLeft >= ( this.moveData.parentWidth - this.moveData.width ) && navLeft <= 0) { // 左移的极限
            this.props.onCateMove(navLeft);
        }
    }

    // 触屏结束
    handleTouchEnd(e){
        // this.props.isTouchDown = false;
        this.moveData.startX = 0;
    }
    render() {
        const { activeCate, categories, toggleDD, visibilityDropdown, onCateClick, navLeft } = this.props;
        let liWidth = 2.12;
        let ddLiWidth = 2.5;
        let ulStyle = {
            left: `${navLeft}px`,
            width: `${categories.length * liWidth + 0.5}rem`, // 加0.5的缓冲
        };
        let cateNodes = categories.map(
            c => (<Cate activeCate={activeCate} onCateClick={onCateClick} liWidth={liWidth} cate={c} />));
        let ddCateNodes = categories.map(
            c => (<Cate activeCate={activeCate} onCateClick={onCateClick} liWidth={ddLiWidth} cate={c} />));

        // 事件组合
        const events = {
            onTouchStart: this.handleTouchStart,
            onTouchMove: this.handleTouchMove,
            onTouchEnd: this.handleTouchEnd,
            onTouchCancel: this.handleTouchEnd,
        };

        return (
            <div>
                <section className="w-section nav-section clearfix">
                    <div className="nav-wrap">
                        <ul id="mainNav" ref="mainNav" style={ulStyle} {...events}>
                            {cateNodes}
                        </ul>
                    </div>
                    <div className={visibilityDropdown ? "nav-dropdown active" : "nav-dropdown"}>
                        <span className="arrow" onClick={toggleDD}>&nbsp;</span>
                        <div className="dd-panel">
                            <ul id="moreNav">
                                {ddCateNodes}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
// function CateNav({ activeCate, categories, toggleDD, visibilityDropdown, onCateClick }) {
//
// }

CateNav.propTypes = {
    activeCate: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    toggleDD: PropTypes.func,
    visibilityDropdown: PropTypes.func,
    onCateClick: PropTypes.func,
    onCateMove: PropTypes.func,
    navLeft: PropTypes.number.isRequired,
};

export default CateNav;
