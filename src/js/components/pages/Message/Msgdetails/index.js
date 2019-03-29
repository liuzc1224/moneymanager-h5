import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './sty.css'


class Msgdetails extends Component {
    render() {
        return (
            <div className={style.main}>
                <p className={style.title}>{this.props.data.title}</p>
                <p className={style.time}>{this.props.data.sendTime}</p>
                <p className={style.center} dangerouslySetInnerHTML={{__html: this.props.data.text}}></p>
            </div>
        );
    }
}
Msgdetails.propTypes = {
    data: PropTypes.array
};

export default Msgdetails;