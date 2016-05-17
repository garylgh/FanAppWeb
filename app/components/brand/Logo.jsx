/**
 * @require Logo.less
 */

import React, { PropTypes } from 'react';

function Logo({ brand }) {
    return (
        <section className="w-section logo-section">
            <div className="logo-bg">
                <img src={brand.image} width="100%" height="180px" alt="" />
            </div>
            <div className="small-logo">
                <a href="">
                    <img src={brand.logo} width="80px" height="80px" alt="" />
                </a>
            </div>
            <p className="brand-name">{brand.title}</p>
        </section>
    );
}

Logo.propTypes = {
    brand: PropTypes.object.isRequired,
};

export default Logo;
