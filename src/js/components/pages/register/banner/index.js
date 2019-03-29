import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './banner.css';

class Banner extends Component {
    render() {
        let { url } = this.props;

        return (
            <div className={style.wrapper}>
                <img src={url} alt="banner"/>
            </div>
        )
    }
}

Banner.propTypes = {
    url: PropTypes.string.isRequired
}

export default Banner;