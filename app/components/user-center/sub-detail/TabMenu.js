/**
 * @require TabMenu.less
 */
import React, { PropTypes } from 'react';

function TabMenu({ selectedIndex, clickTab, infos }) {
  function handleClick(e) {
    clickTab(e.currentTarget.getAttribute('data-index'));
  }
  const lis = infos.map((info) =>
    (<li className={selectedIndex == info.index ? 'active' : ''} data-index={info.index} onClick={handleClick}>
      <div className="title">{info.title}</div>
    </li>));
  return (
    <ul className="or-tab">
      {lis}
    </ul>
  );
}

TabMenu.propTypes = {
  selectedIndex: PropTypes.number,
  clickTab: PropTypes.func,
  infos: PropTypes.array,
};

export default TabMenu;
