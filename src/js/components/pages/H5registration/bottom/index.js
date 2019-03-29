import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import img from '../../../../../img/bg.png'
import style from './bottom.css';

class Bottom extends Component {

    constructor(props){
        super(props);
        this.state = {
            checkboxVal : false
        }
    }
    render() {
        return (
            <div className={style.bottom}>
                <img src={img} className={style.bj} alt=""/>
                <a href='https://play.google.com/store/apps/details?id=com.guiafatura.brazil'>
                    <button className={style.btn}>
                        <FormattedMessage
                            id={ 'H5_REGISTRATION_DOWNLOAD' }
                            description='立即下载'
                            defaultMessage=''
                        />
                    </button>
                </a>
            </div>
        );
    }
}


export default Bottom;