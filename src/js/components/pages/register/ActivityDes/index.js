import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './activityDes.css';

class ActivityDes extends Component {
  render() {
  	let { title, des, linkHref } = this.props;

    return (
      <div className={style.wrapper}>
        <p className={style.title}>{title}</p>
        <div className={style.rule}>
          <div className={style.content} dangerouslySetInnerHTML={{__html: des}}></div>
        </div>
        <a className={style.download} href={linkHref}></a>
      </div>
    )
  }
}

ActivityDes.propTypes = {
  title: PropTypes.string.isRequired,
  des: PropTypes.string.isRequired
}

export default ActivityDes;