import React, { Component } from 'react';
import style from './title.css';
import {FormattedMessage} from 'react-intl';
import name from 'classnames';

class Title extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <p className={ name( 'common-text-center', [style['title-box']] ) }>
                    <FormattedMessage
                        id='CREDIT_PAGEINDEX_TITLE'
                        description='绑定手机号,免费查征信'
                        defaultMessage=''
                        values={
                            { br : <br/> }
                        }
                    />
                </p>
                <p className={ name( 'common-text-center', [style['title-tip']] ) }>
                    <FormattedMessage
                        id='CREDIT_PAGEINDEX_TIP'
                        description='一个月只能查一次哦'
                        defaultMessage=''
                    />
                </p>
            </div>
        );
    }
}

export default Title;