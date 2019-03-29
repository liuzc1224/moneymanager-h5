import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './CheckBox.css';

class CheckBox extends Component {

    constructor(props){
        super(props);
        this.state = {
            checkboxVal : false
        }
    }

    handleChange(e){

        this.setState({
            checkboxVal : e.target.checked
        })

        this.props.checkChange(e.target.checked);

    }

    toLoan(){
        window.location.href = '/registrationAgreement';
    }

    render() {
        const { rightTxt } = this.props ;
        const checkActive = this.state.checkboxVal ? style['ant-checkbox-checked'] : '';
        return (
            <div className={style.checkboxWrap}>
                <label className={[style['ant-checkbox-wrapper'], checkActive].join(' ')}>
                    <span className={style['ant-checkbox']}>
                        <input
                            className={style['ant-checkbox-input']}
                            type="checkbox"
                            checked={this.state.checkboxVal}
                            onChange={this.handleChange.bind(this)}/>
                        <span className={style['ant-checkbox-inner']}></span>
                    </span>
                </label>

                <div className={style.rightTxt}>{rightTxt}He leído y aceptado <span className={style.linkColor} onClick={this.toLoan.bind(this)}>el acuerdo de privacidad de</span></div>
            </div>
        );
    }
}

CheckBox.propTypes = {
    checkChange: PropTypes.func.isRequired
};

export default CheckBox;