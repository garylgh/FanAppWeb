/**
 * @require CateNav.less
 */

import React, { PropTypes } from 'react';
import Cate from './Cate.jsx';

function CateNav({ activeCate, categories, toggleDD, visibilityDropdown, onCateClick }) {
    let liWidth = 2.12;
    let ddLiWidth = 2.5;
    let ulStyle = {
        width: `${categories.length * liWidth}rem`,
    };
    let cateNodes = categories.map(
        c => (<Cate activeCate={activeCate} onCateClick={onCateClick} liWidth={liWidth} cate={c} />));
    let ddCateNodes = categories.map(
        c => (<Cate activeCate={activeCate} onCateClick={onCateClick} liWidth={ddLiWidth} cate={c} />));
    return (
        <div>
            <section className="w-section nav-section clearfix">
                <div className="nav-wrap">
                    <ul id="mainNav" style={ulStyle}>
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

CateNav.propTypes = {
    activeCate: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    toggleDD: PropTypes.func,
    visibilityDropdown: PropTypes.func,
    onCateClick: PropTypes.func,
};

export default CateNav;
