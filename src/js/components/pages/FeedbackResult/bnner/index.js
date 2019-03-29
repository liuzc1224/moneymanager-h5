import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import style from './bnner.css';
import url from './img/bjd.png'
class Img extends Component{
    render(){
        return(
            <div className={style.IMG}>
                <img src={url} alt=""/>
                <p>
                    <FormattedMessage
                        id={this.props.Text}
                        description='按钮'
                        defaultMessage=''
                    />
                </p>
            </div>
        )
    }
}

export default Img;