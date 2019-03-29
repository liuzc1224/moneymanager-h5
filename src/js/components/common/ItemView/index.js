import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './itemView.css';
import {FormattedMessage} from 'react-intl';
import name from 'classnames';

/*
    showLeftLen 是否需要左边下边距
    showRightCut 是否需要右边箭头，有箭头时不显示右边文字，必传右边点击事件
    i18nInfo 左边文字国际化配置
    rightTxt 右边文字
实例：
    <ItemView
        showLeftLen
        showRightCut
        i18nInfo={
            {
                id:"CREDIT_PAGEINDEX_BANDINFO_CPF",
                description:"绑定cpf",
                defaultMessage:""
            }
        }
        rightTxt:"1234"
        pareRightClick={()=>{
            router.push()
        }}
    />
*/

class ItemView extends Component {

    rightClick(){
        const { pareRightClick, showRightCut, url } = this.props
        if (showRightCut) {
            pareRightClick(url);
        }
    }

    render() {
        const { showLeftLen, showRightCut, rightTxt , i18nInfo } = this.props
        let i18nHtml = "";
        if (typeof i18nInfo === 'object') {
            i18nHtml =  <FormattedMessage
                                {...i18nInfo}
                            />
        }else{
            i18nHtml = <span></span>
        }
        return (
            <div className={name([style['outWrap'], {'itemView-leftPadding': !showLeftLen}])} onClick={this.rightClick.bind(this)}>
                <p className={name([style['wrap'], {'itemView-leftPadding': showLeftLen}])}>
                    {i18nHtml}
                    <span className={name([style['rightTxt'], {'itemView-cut': showRightCut}])}>
                            { !showRightCut ? rightTxt : null }
                    </span>
                </p>
            </div>
        );
    }
}

ItemView.propTypes = {
    showLeftLen: PropTypes.bool ,
    showRightCut: PropTypes.bool ,
    rightTxt: PropTypes.string ,
    i18nInfo: PropTypes.object ,
    pareRightClick: PropTypes.func ,
    url: PropTypes.string ,
};

export default ItemView;