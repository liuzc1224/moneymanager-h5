import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RegisterStepOne.css';

import icon1 from '../../../../../img/icon1.png';
import icon2 from '../../../../../img/icon2.png';
import icon3 from '../../../../../img/icon3.png';

import CheckBox from './../CheckBox';
import VerifyCode from './../../../common/VerifyCode';

class RegisterStepOne extends Component {

  constructor(props){
    super(props);
    this.state = {
      checkboxVal : false
    }
  }

	goRegisterSemnew(e) {
		this.props.goRegisterSemnew(this.refs.input.value);
  }

  submitReg(e){
    const parmas = {
      areaCode: 52,
      phoneNumber: this.refs.input.value,
      password: this.refs.inputpwd.value,
      verificationCode: this.refs.inputcode.value,
      checkboxVal: this.state.checkboxVal
    }
    this.props.doRegister(parmas);
  }

  checkChange(value){
    this.setState({
      checkboxVal: value
    })
  }

  sendCode(){
    this.props.sendCode(this.refs.input.value);
  }

  render() {
    const { isShowNextStepInp, canStartCutDown, onSuccessSend } = this.props;

    const regSetpTwoHtml =
      <div>
          <p className={style.inpWrapper} >
            <label htmlFor="pwdInp"><img className={style.img} src={icon2} alt=""/></label>
            <input id="pwdInp" ref="inputpwd" type="password" name="password" placeholder="6-20 caracteres con números y letras." className={style.input} />
          </p>
          <p className={style.inpWrapper}>
            <label htmlFor="codeInp"><img className={style.img} src={icon3} alt=""/></label>
            <input id="codeInp" ref="inputcode" type="tel" name="code" placeholder="por favor, ingrese la verificación" className={style.input} />
            <VerifyCode
              isSend={canStartCutDown}
              onhandlePhone={this.sendCode.bind(this)}
              onSuccessSend={onSuccessSend}/>
            {/* <i className={style.codeBtn} onClick={this.sendCode.bind(this)}>Enviar</i> */}
          </p>
      </div>;


    return (
      <div className={style.wrapper}>
        <p className={style.inpWrapper}>
          <label htmlFor="phoneInp"><img className={style.img} src={icon1} alt=""/></label>
      	  <input id="phoneInp" ref="input" type="tel" maxLength="10" name="mobile" placeholder="por favor, ingrese el número de teléfono" className={style.input} />
        </p>

        {isShowNextStepInp && regSetpTwoHtml}

        {isShowNextStepInp && <CheckBox checkChange={this.checkChange.bind(this)}/>}

      	<a className={style.link} onClick={ isShowNextStepInp ? this.submitReg.bind(this) : this.goRegisterSemnew.bind(this)}>{isShowNextStepInp ? 'Register' : 'Next'}</a>

        <p className={style.txtTip}>3 minutos en revisar 24 horas en llegar</p>

      </div>
    )
  }
}

RegisterStepOne.propTypes = {
  goRegisterSemnew: PropTypes.func.isRequired,
  doRegister: PropTypes.func.isRequired,
  sendCode: PropTypes.func.isRequired,
  canStartCutDown: PropTypes.bool.isRequired
}

export default RegisterStepOne;