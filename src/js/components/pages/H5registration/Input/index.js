import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {injectIntl,intlShape,FormattedMessage } from 'react-intl';
import style from './Input.css';
import icon4 from "../../../../../img/icon4.png";
import icon2 from "../../../../../img/icon2.png";
import icon3 from "../../../../../img/icon3.png";
import EmailVerifyCode from "../EmailVerifyCode";
import RegisterStepOne from "../../register/RegisterStepOne";
import CheckBox from "../CheckBox";

class Input extends Component {

    constructor(props){
        super(props);
        this.state = {
            checkboxVal : false
        }
    }
    sendCode(){
        this.props.sendCode(this.refs.input.value);
    }
    goRegisterSemnew(e) {
        this.props.goRegisterSemnew(this.refs.input.value);
    }
    checkChange(value){
        this.setState({
            checkboxVal: value
        })
    }
    submitReg(e){
        const {isShowNextStepInp}=this.props;
        console.log(isShowNextStepInp);
        if(isShowNextStepInp){
            let parmas = {
                areaCode: 52,
                Email: this.refs.input.value,
                password: this.refs.inputpwd.value,
                Code: this.refs.inputcode.value,
                checkboxVal: this.state.checkboxVal
            };
            this.props.doRegister(parmas);
        }
    }
    toLoan(){
        let data={
            Email: this.refs.input.value,
            password: this.refs.inputpwd.value,
            Code: this.refs.inputcode.value,
            checkboxVal: this.state.checkboxVal
        };
        console.log(data.checkboxVal+"<<<<<<<<<<<<<");
        window.sessionStorage.setItem("zcInfo",JSON.stringify(data));
        window.location.href = '/registrationAgreement';
    }
    componentDidMount() {
        if(window.sessionStorage.getItem("zcInfo")){
            let data=JSON.parse(window.sessionStorage.getItem("zcInfo"));
            this.refs.input.value=data.Email;
            this.props.goRegisterSemnew(data.Email);
            let that=this;
            console.log(data.checkboxVal+">>>>>>>>>>");
            setTimeout(function () {
                that.refs.inputpwd.value=data.password;
                that.refs.inputcode.value=data.Code;
                console.log(1)
            },10)
        }
    }
    render() {
        const { isShowNextStepInp, canStartCutDown, onSuccessSend } = this.props;
        const {formatMessage} = this.props.intl;
        const pwd={id:'H5_REGISTRATION_PASSWORD'};
        const email={id:'H5_REGISTRATION_EMAIL'};
        const code={id:'H5_REGISTRATION_CODE'};
        const regSetpTwoHtml=
            <div className={style.wrapper}>
                <p className={style.inpWrapper}>
                    <label htmlFor="phoneInp"><img className={style.img} src={icon2} alt=""/></label>
                    <input id="password" ref="inputpwd" type="password" name="password" placeholder={formatMessage (pwd)} className={style.input} maxLength={'18'} minLength={'6'} />
                </p>
            </div>;
        const CodeHtml=
            <p className={style.inpWrapper}>
                <label htmlFor="codeInp"><img className={style.img} src={icon3} alt=""/></label>
                <input id="codeInp" ref="inputcode" type="tel" name="code" placeholder={formatMessage (code)} className={style.input} style={{width:'500px'}} maxLength="4" />
                <EmailVerifyCode
                    isSend={canStartCutDown}
                    onhandlePhone={this.sendCode.bind(this)}
                    onSuccessSend={onSuccessSend}/>
                {/* <i className={style.codeBtn} onClick={this.sendCode.bind(this)}>Enviar</i> */}
            </p>;
        const checkHtml=<div className={style.wrapper}>
                <div  className={style.checkbox}>
                    <CheckBox
                        toLoan={this.toLoan.bind(this)}
                        checkChange={this.checkChange.bind(this)}/>
                </div>
            </div>;
        return (
            <div className={style.body}>
                <div className={style.wrapper}>
                    <p className={style.inpWrapper}>
                        <label htmlFor="phoneInp"><img className={style.img} src={icon4} alt=""/></label>
                        <input
                            id="phoneInp"
                            ref="input"
                            type="text"
                            name="email" onBlur={this.goRegisterSemnew.bind(this)} placeholder={formatMessage (email)} className={style.input} maxLength="40" />
                    </p>
                </div>
                <div className={style.bj}>
                    {isShowNextStepInp && regSetpTwoHtml}
                    {/*{regSetpTwoHtml}*/}
                    <div className={style.main}>
                        {isShowNextStepInp && CodeHtml}
                        {/*{CodeHtml}*/}
                    </div>
                    {isShowNextStepInp && checkHtml}
                    <a className={style.link} onClick={this.submitReg.bind(this)}>
                        <FormattedMessage
                            id={ 'H5_REGISTRATION_REGISTRATION' }
                            description='注册'
                            defaultMessage=''
                        />
                    </a>

                    <p className={style.txtTip}>
                        <FormattedMessage
                            id={ 'H5_REGISTRATION_TEXT' }
                            description=''
                            defaultMessage=''
                        />
                    </p>
                </div>
            </div>
        );
    }
}

RegisterStepOne.propTypes = {
    goRegisterSemnew: PropTypes.func.isRequired,
    sendCode: PropTypes.func.isRequired,
    doRegister: PropTypes.func.isRequired,
    canStartCutDown: PropTypes.bool.isRequired,
    intl: intlShape.isRequired
};

export default injectIntl(Input);