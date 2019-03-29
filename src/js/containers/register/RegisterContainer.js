import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import md5 from 'js-md5';
import * as AppActions from '../../actions/AppActions';

import Banner from '../../components/pages/register/banner';
import RegisterStepOne from '../../components/pages/register/RegisterStepOne';
import ActivityDes from '../../components/pages/register/ActivityDes';

import Spinner from './../../components/common/Spinner';
import Toast from './../../components/common/Toast';

import utils from './../../lib/utils';


import bannerImg from '../../../img/banner.png';



class RegisterContainer extends Component {
    //获取手机号 ，校验手机号是否注册
    goRegisterSemnew(mobile){
        const { actions } = this.props;

        actions.doAction('GO_REGISTER_CHECK', {
            areaCode: 52,
            phoneNumber: mobile
        })

    }

    doRegister(parmas){
        const { actions } = this.props;
        if (!parmas.phoneNumber) {
            //请输入手机号
            actions.doAction('TOAST', ' Introduzca el número de móvil');
            return;
        }else if(!utils.validPass(parmas.password)){
            //密码格式不正确
            actions.doAction('TOAST', 'Forma de contraseña no está correcta');
            return;
        }else if(!parmas.verificationCode){
            //请输入验证码
            actions.doAction('TOAST', 'Introduzca el código de  verificación');
            return;
        }else if(!parmas.checkboxVal){
            //请勾选协议
            actions.doAction('TOAST', 'Marque el acuerdo');
            return;
        }
        parmas.password = md5(parmas.password)
        //
        // actions.doAction('DO_REGISTER', parmas) ;
    }
    //发送短信验证码
    sendCode(mobile){
        const { actions } = this.props;
        if (!mobile && mobile.length === 10) {
            //请输入手机号
            actions.doAction('TOAST', 'Por favor ingrese el número de móvil correcto');//请输入正确的手机号
            return;
        }
        actions.doAction('SEND_REGISTER_CODE', {
            areaCode: 52,
            verificationType: 1,
            phoneNumber: mobile
        })
    }
    //倒计时结束
    onSuccessSend(){
        const { actions } = this.props;
        actions.doAction('REGISTER_CODE_FETCH', {
            canStartCutDown: false
        })
    }

    render() {

        const { spinnerReducer, toastReducer, checkMobileReducer, codeReducer } = this.props;

        return (
            <div style={ { paddingBottom: '70px', background: '#fff' } }>
                {/* {this.state.showHeader && <Header
                        title={'sdsd'}
                        router={this.props.router}/>} */}

                <Banner url={bannerImg} />
                <RegisterStepOne
                    isShowNextStepInp={checkMobileReducer.isShowNextStepInp}
                    canStartCutDown={codeReducer.canStartCutDown}
                    goRegisterSemnew={this.goRegisterSemnew.bind(this)}
                    doRegister={this.doRegister.bind(this)}
                    sendCode={this.sendCode.bind(this)}
                    onSuccessSend={this.onSuccessSend.bind(this)}/>
                <ActivityDes
                    title='¿Por qué elije iLoan?'
                    des='Información más segura—servicio de privacidad completo Costo más bajo—tasa diaria baja a 1.1% Prestar más rápido—llegar a su cuenta en 3 minutos tras la solicitud Monto más variable—1000-3000pesos, elegir con su gusto Servicio más íntimo—pedir préstamo sin hablar'
                    linkHref="https://play.google.com/store/apps/details?id=com.panshi.hujin2.iloan"/>

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
        checkMobileReducer: state.checkMobileReducer,
        codeReducer: state.codeReducer
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
)(RegisterContainer);