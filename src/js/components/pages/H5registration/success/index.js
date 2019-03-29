import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import img from "./img/Logo.png";
import style from './success.css';

class Success extends Component {

    constructor(props){
        super(props);
        this.state = {
            checkboxVal : false
        }
    }
    render() {
        return (
            <div className={style.main}>
               <img src={img} alt=""/>
                <p>
                    <FormattedMessage
                        id={ 'H5_REGISTRATION_SUCCESS' }
                        description='注册成功'
                        defaultMessage=''
                    />
                </p>
            </div>
        );
    }
}


export default Success;