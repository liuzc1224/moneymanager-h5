import React, { Component } from 'react';
import style from './checkbox.css';

import PropTypes from 'prop-types';
import name from 'classnames';

class Checkbox extends Component {
    render() {
        const { handleCheck, checkStatus } = this.props;
        return (
            <div className={style.wrap}>
                <span className={ name( style.checkbg, {'checkbox-checkbgactive': checkStatus} ) } onClick={handleCheck}></span>
                <p className={style.txt}>
                    {this.props.children}
                </p>
            </div>
        );
    }
}

Checkbox.propTypes = {
    handleCheck: PropTypes.func.isRequired,
    checkStatus: PropTypes.bool.isRequired,
};

export default Checkbox;