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
    this.handleCoverClick = this.handleCoverClick.bind(this);

    this.moveData = {
      currentLeft: 0,
      startX: 0, // 按下位置
      width: 0,
      parentWidth: 0,
    };
  }
  // 触屏开始
  handleTouchStart(e) {
    const event = e || window.event;
    this.moveData.startX = event.touches[0].pageX;
    this.moveData.currentLeft = this.refs.mainNav.offsetLeft;
    this.moveData.width = this.refs.mainNav.offsetWidth;
    this.moveData.parentWidth = this.refs.mainNav.parentNode.offsetWidth;
    this.moveData.maxLeft = this.moveData.parentWidth - this.moveData.width - 20;
  }

  // 触屏滑动
  handleTouchMove(e) {
    e.preventDefault();
    const event = e || window.event;
    const nowX = event.touches[0].pageX;
    const offsetX = nowX - this.moveData.startX;
    const navLeft = this.moveData.currentLeft + offsetX * 2;
    if (navLeft >= this.moveData.maxLeft && navLeft <= 0) { // 左移的极限
      this.props.onCateMove(navLeft);
    }
  }

  // 触屏结束
  handleTouchEnd() {
    // this.props.isTouchDown = false;
    this.moveData.startX = 0;
  }
  handleCoverClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onCoverClick();
  }
  calNavleft(liWidth, baseFontsize, index, len) {
    if (index < 3) { // 前三个不动
      return 0;
    } else if (index < len - 1) {
      return -(liWidth * (baseFontsize) * (index - 2));
    } else { // 最后一个
      return -(liWidth * (baseFontsize) * (index - 3));
    }
  }
  render() {
    const {
      activeCate,
      categories,
      toggleDD,
      visibilityDropdown,
      onCateClick,
      navLeft,
    } = this.props;
    let liWidth = 2.12;
    let ddLiWidth = 2.5;
    let activeNavleft = navLeft;
    const baseFontsize = Number(document.documentElement.style.fontSize.match(/(\d*(\.\d*)?)px/)[1]);
    let cateNodes = [];
    let ddCateNodes = [];
    for (let i = 0; i < categories.length; i++) {
      const c = categories[i];
      let nf = this.calNavleft(liWidth, baseFontsize, i, categories.length);
      // importent: 只有initial render时才需要通过activeCate来定位。其它时候使用parent传递下来的navLeft
      if (!navLeft && c.iid === activeCate) {
        activeNavleft = nf;
      }
      cateNodes.push((<Cate
        key={c.iid}
        activeCate={activeCate}
        navLeft={nf}
        onCateClick={onCateClick}
        liWidth={liWidth}
        cate={categories[i]}
      />));
      ddCateNodes.push((<Cate
        key={`dd_${c.iid}`}
        activeCate={activeCate}
        navLeft={nf}
        onCateClick={onCateClick}
        liWidth={ddLiWidth}
        cate={categories[i]}
      />));
    }
    let ulStyle = {
      left: `${activeNavleft}px`,
      width: `${categories.length * liWidth + 0.5}rem`, // 加0.5的缓冲
    };

    // 事件组合
    const events = {
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd,
      onTouchCancel: this.handleTouchEnd,
    };

    return (
      <section className="w-section nav-section">
        <div className="nav-wrap">
          <ul id="mainNav" ref="mainNav" style={ulStyle} {...events}>
            {cateNodes}
          </ul>
        </div>
        <div className={visibilityDropdown ? 'nav-dropdown active' : 'nav-dropdown'}>
          <span className="arrow" onClick={toggleDD}>&nbsp;</span>
          <div className="dd-panel" >
            <div
              className="d-cover"
              onClick={this.handleCoverClick}
              onScroll={this.handleCoverClick}
              onTouchStart={this.handleCoverClick}
            ></div>
            <ul id="moreNav" className="more-nav">
              {ddCateNodes}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

CateNav.propTypes = {
  activeCate: PropTypes.number,
  categories: PropTypes.array.isRequired,
  toggleDD: PropTypes.func,
  visibilityDropdown: PropTypes.bool,
  onCateClick: PropTypes.func,
  onCateMove: PropTypes.func,
  onCoverClick: PropTypes.func,
  navLeft: PropTypes.number,
};

export default CateNav;
