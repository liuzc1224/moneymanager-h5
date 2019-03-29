import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './header.css';

class Header extends Component {
  _getLeftBtn() {
    let { leftClick } = this.props;
    return (
      <div className={style.leftBtn} onClick={leftClick || this._leftClick.bind(this)}></div>
    )
  }
  _getRightBtn() {
    let { rightClick, rightTitle, iconImg } = this.props;
    return (
      <div className={style.rightBtn} onClick={rightClick}>{rightTitle || iconImg || ''}</div>
    )
  }
  _leftClick() {
    let { router } = this.props;
    router.go(-1);
  }
  render() {
    let { title, isShowLeftBtn, rightClick, rightTitle, titleStyle, iconImg } = this.props;

    return (
      <div className={style.header}>
        {isShowLeftBtn ? this._getLeftBtn() : ''}
        <div className={style.title} style={titleStyle}>{title}</div>
        { (rightClick || rightTitle || iconImg) ? this._getRightBtn() : '' }
      </div>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

Header.defaultProps = {
  title: '',
  isShowLeftBtn: true
}

export default Header;