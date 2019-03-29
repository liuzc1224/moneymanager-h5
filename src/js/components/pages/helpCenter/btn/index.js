import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import style from './btn.css';
class Btn extends Component{
    Jump(){
        this.props.feedback();
    }
    render(){
        return(
            <div
                className={style.btn}
                onClick={this.Jump.bind(this)}
            >
                <FormattedMessage
                    id={this.props.Text}
                    description='按钮'
                    defaultMessage=''
                />
            </div>
        )
    }
}
Btn.propTypes = {
    Text: PropTypes.string,
};

export default Btn;