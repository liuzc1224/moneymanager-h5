import React, { Component } from 'react';
import style from './banner.css';

class Banner extends Component {
  render() {
    const { url } = this.props;

    return (
      <div className={style.wrapper}>
      	<img className={style.banner} src={url} alt="" />
      </div>
    )
  }
}

export default Banner;