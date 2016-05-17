import React, { PropTypes } from 'react';

function Cate({ activeCate, liWidth, cate, onCateClick }) {
    let liStyle = {
        width: liWidth + 'rem',
    }
    function handleClick() {
        onCateClick(cate.id);
    }
    return (
        <li className={activeCate == cate.id ? "nav-item active" : "nav-item"}
            data-category={cate.id} style={liStyle} onClick={handleClick}>
            {cate.name}
        </li>
    );
}

Cate.propTypes = {
    activeCate: PropTypes.string.isRequired,
    cate: PropTypes.object.isRequired,
}

export default Cate;
