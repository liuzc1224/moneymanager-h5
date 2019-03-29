import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
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
        this.props.toLoan();
    }
    componentDidMount() {
        if(window.sessionStorage.getItem("zcInfo")){
            let data=JSON.parse(window.sessionStorage.getItem("zcInfo"));
            let that=this;
            setTimeout(function () {
                that.setState({
                    checkboxVal: data.checkboxVal
                })
                that.props.checkChange(data.checkboxVal);
                window.sessionStorage.removeItem("zcInfo");
            },20)
        }
    }
    render() {
        const { rightTxt } = this.props ;
        const checkActive = this.state.checkboxVal ? style['ant-checkbox-checked'] : ''
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

                <div className={style.rightTxt}>{rightTxt}
                    <FormattedMessage
                        id={'H5_REGISTRATION_REMIND'}
                        description='我已阅读并同意'
                        defaultMessage=''
                    />
                    <span className={style.linkColor} onClick={this.toLoan.bind(this)}>
                        <FormattedMessage
                            id={'H5_REGISTRATION_REMIND_PROTOCOL'}
                            description='《隐私协议》'
                            defaultMessage=''
                        />
                    </span>
                </div>
            </div>
        );
    }
}

CheckBox.propTypes = {
    toLoan:PropTypes.func,
    checkChange: PropTypes.func.isRequired
};

export default CheckBox;