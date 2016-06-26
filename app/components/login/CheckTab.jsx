/**
 * @require CheckTab.less
 */
import React, { PropTypes } from 'react';

function CheckTab({ changeTab, selectedIndex }) {
  function handleClick(e) {
    changeTab(e.target.getAttribute('data-index'));
  }
  return (
    <ul className="lrtab">
      <li className={selectedIndex == 0 ? 'active' : ''} data-index="0" onClick={handleClick}>注册</li>
      <li className={selectedIndex == 1 ? 'active' : ''} data-index="1" onClick={handleClick}>登录</li>
    </ul>
  );
}

export default CheckTab;
