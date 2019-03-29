import React, { Component } from 'react';
import bj from './images/bj.png';
import icon from './images/icon.png';
import {FormattedMessage} from 'react-intl';
import style from './banner.css';

class Banner extends Component {

    constructor(){
        super();
        this.state = {
            checkboxVal : false
        }
    }
    render() {
        return (
            <div>
                <img src={bj} className={style.IMG} alt=""/>
                <div className={style.logo}>
                    <img src={icon} alt={'logo'}/>
                </div>
                <p className={style.one}>Guiafatura</p>
                <p className={style.ad}>
                    <FormattedMessage
                        id={'H5_REGISTRATION_AD'}
                        description='内容'
                        defaultMessage=''
                    />
                </p>

                <p className={style.two}>
                    <FormattedMessage
                        id={'H5_REGISTRATION_LOGO_AD'}
                        description='信用卡多卡管理,还可免费查征信'
                        defaultMessage=''
                        values={
                            { br : <br/> }
                        }
                    />
                </p>
            </div>
        );
    }
}


export default Banner;