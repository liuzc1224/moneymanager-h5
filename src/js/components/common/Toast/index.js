import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './toast.css';
import names from 'classnames';

class Toast extends Component {
  render() {
      let { list=[] } = this.props;
      
      return (
          <div className={names("toast-container",style['toast-container'])}>{
              list.length > 0 ?
              list.map((msg) => {
                return (
                    <div key={msg.key} className={names(["toast-msg-wrap",style['toast-msg-wrap']])}>
                        <div className={names("toast-msg", style['toast-msg'])} key={msg.key}>
                            {msg.content}
                        </div>
                    </div>
                )
              }):
              null
          }</div>
      )
  }
}

Toast.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object)
}

export default Toast;