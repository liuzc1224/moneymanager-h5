import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import style from './btn.css';
class Btn extends Component{
    jump(){
        this.props.jump();
    }
    render(){
        return(
            <div className={style.BTN}>
                <button onClick={this.jump.bind(this)}>
                    <FormattedMessage
                        id={this.props.Text}
                        description='按钮'
                        defaultMessage=''
                    />
                </button>
            </div>
        )
    }
}
Btn.propTypes = {
    Text: PropTypes.string,
};

export default Btn;