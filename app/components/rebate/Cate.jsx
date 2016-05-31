import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Cate({ activeCate, liWidth, navLeft, cate, onCateClick }) {
  let liStyle = {
    width: `${liWidth}rem`,
  };
  function handleClick() {
    // 还需要滚动导航条，算出navLeft
    onCateClick(cate.iid, navLeft);
  }
  const toUrl = String(cate.iid);
  // onClick={handleClick}
  return (
    <li
      className={activeCate === cate.iid ? "nav-item active" : "nav-item"}
      data-category={cate.iid}
      style={liStyle}>
      <Link to={toUrl} onClick={handleClick}>{cate.name}</Link>
    </li>
  );
}

Cate.propTypes = {
  activeCate: PropTypes.number,
  cate: PropTypes.object.isRequired,
  liWidth: PropTypes.number.isRequired,
  navLeft: PropTypes.number,
  onCateClick: PropTypes.func,
};

export default Cate;
