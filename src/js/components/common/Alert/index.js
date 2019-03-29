import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './alert.css';
import names from 'classnames';

/*
实例：
    <Alert
        isShow
        title="危险提示"
        description="你正在进行危险操作！你正在进行危险操作！你正在进行危险操作！"
        actions={[
        {text:'OK', btnBg:true, cb:()=>{alert('done')}}
        ]}
    />
*/

class Alert extends Component {
  handleClick(callback) {
    this.props.doAction('UPDATE_ALERT', {
        isShow: false,
        title: '',
        description: '',
        actions: []
    })

    callback && callback();
  }
  render() {
      let {isShow, title, description, actions} = this.props;

      let desHtml = description;
    //   if (typeof description === 'object') {
    //     let listHtml = description.map( (item, index) => {
    //         return (
    //             <div key={index} className={item.isLucky ? style.orange : style.number}>{item.luckyNo}</div>
    //         )
    //     } )

    //     desHtml = (
    //         <div className={style.box}>
    //             <div className={style.tit}>参与<span className={style.orange}>{description.length}</span>次</div>
    //             <div className={style.scroll}>
    //                 {listHtml}
    //             </div>
    //         </div>
    //     )
    //   } else {
    //     desHtml = description;
    //   }

      return (
        isShow?<div className={names([style['alert-container']])}>
            <div className={names([style['alert-back']])} />
            <div className={names([style['alert-body-wrap']])}>
                <div className={names([style['alert-body']])}>
                    <div className={names([style['alert-title']])}>{title}</div>
                    <div className={names([style['alert-description']])}>{desHtml}</div>
                    <div className={names([style['alert-actions']])}>
                        {
                            actions?
                            actions.map((button, index) => (
                                <button key={index} className={names([style['alert-button'], {'alert-alert-active' :  button.btnBg}] )} onClick={this.handleClick.bind(this, button.cb)}>{button.text}</button>
                            )):null
                        }
                    </div>
                </div>
            </div>
        </div>:null
      )
  }
}

Alert.propTypes = {
    isShow: PropTypes.bool,
    title: PropTypes.any,
    actions: PropTypes.array
}

export default Alert;