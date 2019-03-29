import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import md5 from 'js-md5';
import * as AppActions from '../../../actions/AppActions';
import { post} from "../../../lib/fetch";
import Banner from '../../../components/pages/H5registration/banner/index';
import Input from '../../../components/pages/H5registration/Input/index'
import Spinner from "../../../components/common/Spinner/index";
import Toast from "../../../components/common/Toast/index";
import Step from "../../../components/pages/H5registration/step/index";
import serves from "../../../api/index";

class H5registration extends Component {
    constructor(){
        super();
        this.state = {
            e_mail: '',
            password: '',
            code:''
        };
    }
    //邮箱验证
    emailVerification(email){
        email=email.replace(" ", "");
        let num = email.split('@').length-1;
        let length=email.indexOf('@');
        if(length>-1 && length!==0 && length<email.length-1 && num===1 && email.length<=40){
            return true;
        }else{
            return false;
        }

    }
    //获取邮箱 ，校验邮箱是否注册
    goRegisterSemnew(email){
        const { actions } = this.props;
        this.emailVerification(email);
        if (!email || !this.emailVerification(email)) {
            //请输入邮箱
            actions.doAction('TOAST', 'formato de e-mail errado,insira novamente');//请输入正确的邮箱
            return;
        }else{
            actions.doAction('GO_REGISTER_EMAIL', {
                email: email
            })
        }

    }
    //发送邮箱验证码
    sendCode(email){
        const { actions } = this.props;
        // const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if (!this.emailVerification(email)) {
            //请输入邮箱
            actions.doAction('TOAST', 'formato de e-mail errado,insira novamente');//请输入正确的邮箱
            return;
        }
        actions.doAction('SEND_EMAIL_CODE', {
            type: 0,
            email: email
        })
    }
    //倒计时结束
    onSuccessSend(){
        const { actions } = this.props;
        actions.doAction('EMAIL_CODE_FETCH', {
            canStartCutDown: false
        })
    }
    componentDidMount(){
        // document.title="sfsfafs";
    }
    doRegister(parmas){
        const { actions } = this.props;
        const reg = new RegExp("^(?![\\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\\da-zA-Z!#$%^&*]{6,20}$");
        console.log(parmas);
        if (!this.emailVerification(parmas.Email)) {
            //请输入邮箱
            actions.doAction('TOAST', 'Insira seu e-mail');
            return;
        }
        if(!reg.test(parmas.password)){
            //密码格式不正确
            console.log(parmas.password);
            actions.doAction('TOAST', 'Erro de formato de senha');
            return;
        }
        console.log(parmas.Code)
        if(!parmas.Code || parmas.Code['length']!==4){
            //请输入验证码
            console.log(parmas.Code.toString().length);
            actions.doAction('TOAST', 'Introduzca el código de  verificación');
            return;
        }
        if(!parmas.checkboxVal){
            //请勾选协议
            actions.doAction('TOAST', 'Assinale a política');
            return;
        }
        let $this=this;
        actions.doAction('SHOW_LOADING');
        parmas.password = md5(parmas.password);
        post(serves.escrowHost + serves.emailRegister,{
            body:{
                area:"",
                deviceType:"H5",
                email:parmas.Email,
                password:parmas.password,
                verifyCode:parmas.Code,
            }
        }).then(function(result) {
            actions.doAction('HIDE_LOADING');
            console.log(result.data);
            if(result.data){
                if(result.data.success===true){
                    $this.props.router.push('/registeredResult');
                }else{
                    actions.doAction('TOAST', result.data.message);
                }

            }
        });
        // this.props.router.push('/registeredResult');
        // actions.doAction('DO_REGISTER', parmas) ;
    }
    render() {
        const { spinnerReducer, toastReducer, checkEmailReducer, emailCode } = this.props;
        return (
            <div>
                <Banner  />
                <Input
                    isShowNextStepInp={checkEmailReducer.isShowNextStepInp}
                    canStartCutDown={emailCode.canStartCutDown}
                    goRegisterSemnew={this.goRegisterSemnew.bind(this)}
                    sendCode={this.sendCode.bind(this)}
                    onSuccessSend={this.onSuccessSend.bind(this)}
                    doRegister={this.doRegister.bind(this)}
                />
                <Step />
                <Spinner
                    showLoading={spinnerReducer.showLoading}
                    showDropback={spinnerReducer.showDropback} />

                <Toast
                    list={toastReducer.list} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        spinnerReducer:state.spinnerReducer,
        toastReducer: state.toastReducer,
        checkEmailReducer: state.checkEmailReducer,
        emailCode: state.emailCode
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(H5registration);