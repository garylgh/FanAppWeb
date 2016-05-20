/**
 * @require Logo.less
 */

import React, { PropTypes } from 'react';

function Logo({ brand }) {
    return (
        <section className="w-section logo-section">
            <div className="logo-bg">
                <img src={brand.bigPic} alt="" />
            </div>
            <div className="small-logo">
                <a href="">
                    <img src={brand.logoPic} width="80px" height="80px" alt="" />
                </a>
            </div>
            <p className="brand-name">{brand.name}</p>
        </section>
    );
}

Logo.propTypes = {
    brand: PropTypes.object.isRequired,
};

export default Logo;
