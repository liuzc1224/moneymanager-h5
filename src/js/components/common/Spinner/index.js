import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './spinner.css';
import classNames from 'classnames';

class Spinner extends Component {
  render() {
    let { showLoading } = this.props;
    
    return (
      <div className={classNames(style['load-container'],
           { [style['load-container-active']] : showLoading })
        }>
        {showLoading && <div className={style.loading}>
          <i className={style.icon}></i>
          <span className={style.txt}>Loading...</span>
        </div>}
      </div>
    )
  }
}

Spinner.propTypes = {
  showLoading: PropTypes.bool
}

Spinner.defaultProps = {
  showLoading: false
}

export default Spinner;