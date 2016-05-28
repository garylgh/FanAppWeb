import React, { PropTypes } from 'react';

function Cate({ activeCate, liWidth, navLeft, cate, onCateClick }) {
    let liStyle = {
        width: liWidth + 'rem',
    }
    function handleClick() {
        // 还需要滚动导航条，算出navLeft
        onCateClick(cate.iid, navLeft);
    }
    return (
        <li className={activeCate == cate.iid ? "nav-item active" : "nav-item"}
            data-category={cate.iid} style={liStyle} onClick={handleClick}>
            {cate.name}
        </li>
    );
}

Cate.propTypes = {
    activeCate: PropTypes.string.isRequired,
    cate: PropTypes.object.isRequired,
    liWidth: PropTypes.number.isRequired,
    navLeft: PropTypes.number,
    onCateClick: PropTypes.func,
};

export default Cate;
