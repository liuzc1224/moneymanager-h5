import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as AppActions from '../../actions/AppActions';

import Spinner from './../../components/common/Spinner';
import Alert from './../../components/common/Alert';
import Toast from './../../components/common/Toast';

import utils from './../../lib/utils';
import { get, post } from '../../lib/fetch';
import api from '../../api';
import bridge from '../../lib/bridge';

import CpfInp from './../../components/pages/seachCredit/cpfInp';
import Title from './../../components/pages/seachCredit/title';

import Detail from './../../components/pages/seachCredit/detail';





class SeachCreditContainer extends Component {

    state = {
        checkStatus: false,
        cpfArr: [].length = 4,
        hasPhone: false,
    }

    componentDidMount(){
        let that = this;
        window.reloadPage = function() {
            that._checkCPF();
            that._checkPhone();
        }
        bridge.displayReload("reloadPage")
        this._checkCPF();
        this._checkPhone();
    }
    handleCheck(){
        let now = !this.state.checkStatus;
        this.setState({
            checkStatus: now
        })
    }

    handleChange(val){
        let cpfArr = this._sliceCpf(val);
        this.setState({
            cpfArr: cpfArr
        })
    }
    handleSeach(){
        // this._showTip()
        // 查询按钮
        if (!this.state.hasPhone) {
            this._savePhoneTip();
            return false;
        }
        this._saveTip()
    }

    _sliceCpf(val){
        let reg = /(\d|\w+?)(?=(?:\d{3}|\w{3})+$)/g ;
        val = val.split('').reverse().join('');
        val = val.replace( reg, '$1,');
        val = val.split('').reverse().join('');
        let cpfArr = val.split(',');
        cpfArr.length = 4;
        return cpfArr;
    }

    _checkCPF(){
        const { actions } = this.props;
        actions.doAction("SHOW_LOADING")
        get(api.escrowHost + api.checkCPF, {
            body: {}
        }).then(
            (res)=>{
                actions.doAction("HIDE_LOADING")
                if (res.data.success && res.data.data) {
                    actions.doAction("SEACH_CREDIT")
                }
            }
        )
    }

    _showTip(){
        const { actions } = this.props;
        let yesHtml = <FormattedMessage
                            id="COMMON_OK"
                            description="queding"
                            defaultMessage=""
                            />
        let desHtml = <FormattedMessage
                            id="COMMON_SYS_TIP"
                            description="des"
                            defaultMessage=""
                            />
        actions.doAction('UPDATE_ALERT', {
            isShow: true,
            status: 'success',
            description: desHtml,
            actions: [
              { text: yesHtml }
            ]
        })
    }

    _savePhoneTip(){
        const { actions } = this.props;
        let yesHtml = <FormattedMessage
                            id="COMMON_PAID_BIND"
                            description="绑定"
                            defaultMessage=""
                            />
        let noHtml = <FormattedMessage
                            id="COMMON_PAID_NOBIND"
                            description="暂不绑定"
                            defaultMessage=""
                            />
        let desHtml = <FormattedMessage
                            id="CREDIT_BIND_PHONE_TIP"
                            description="des"
                            defaultMessage=""
                            />
        actions.doAction('UPDATE_ALERT', {
            isShow: true,
            status: 'success',
            description: desHtml,
            actions: [
              { text: noHtml },
              { text: yesHtml, btnBg: true, cb: (argus) => {
                    bridge.goSetPhoneNum();
              } }
            ]
        })
    }

    _checkPhone(){
        const { actions } = this.props;
        let that = this;
        actions.doAction("SHOW_LOADING")
        get(api.escrowHost + api.checkPhoneNumber, {
            body: {}
        }).then(
            (res)=>{
                actions.doAction("HIDE_LOADING")
                if (res.data && res.data.success && res.data.data) {
                    that.setState({
                        hasPhone: true
                    })
                }
            }
        )
    }

    _saveTip(){
        const { actions } = this.props;
        const that = this;
        let yesHtml = <FormattedMessage
                            id="COMMON_PAID_YES"
                            description="是"
                            defaultMessage=""
                            />
        let noHtml = <FormattedMessage
                            id="COMMON_PAID_NO"
                            description="否"
                            defaultMessage=""
                            />
        let desHtml = <FormattedMessage
                            id="CREDIT_SAVE_CPF_TIP"
                            description="des"
                            defaultMessage=""
                            />
        actions.doAction('UPDATE_ALERT', {
            isShow: true,
            status: 'success',
            description: desHtml,
            actions: [
              { text: noHtml },
              { text: yesHtml, btnBg: true, cb: (argus) => {
                 that._saveCPF();
              } }
            ]
        })
    }

    _saveCPF(){
        const { actions } = this.props;
        actions.doAction("SHOW_LOADING")
        post(api.escrowHost + api.saveCPF, {
            body: {
                cpf: this.state.cpfArr.join('')
            }
        }).then(
            (res) => {
                actions.doAction("HIDE_LOADING")
                if (res.data.success) {
                    actions.doAction("SEACH_CREDIT");
                }else{
                    actions.doAction("TOAST", res.data.message)
                }
            }
        )
    }

    render() {
        const { spinnerReducer, alertReducer, creditInfoReducer, toastReducer, router, actions } = this.props;
        let isEmpty = utils.isEmptyObject(creditInfoReducer.data);
        return (
            <div style={ !isEmpty ? { background: '#fff', height: "100%" } : {} }>
                {
                    !isEmpty ?
                    <div>
                        <Title/>
                        <CpfInp
                            checkStatus={this.state.checkStatus}
                            cpfArr={this.state.cpfArr}
                            handleChange={this.handleChange.bind(this)}
                            handleCheck={this.handleCheck.bind(this)}
                            seachFn={this.handleSeach.bind(this)}/>
                    </div>
                    :
                    <div>
                        <Detail
                            router={router}
                            actions={actions}
                            data={creditInfoReducer.data}
                            />
                    </div>
                }
                <Alert
                    doAction={actions.doAction}
                    isShow={alertReducer.isShow}
                    title={alertReducer.title}
                    description={alertReducer.description}
                    actions={alertReducer.actions}
                    />
                <Spinner
                    showLoading={spinnerReducer.showLoading}
                    showDropback={spinnerReducer.showDropback}
                    />
                <Toast
                    list={toastReducer.list} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        spinnerReducer:state.spinnerReducer,
        alertReducer:state.alertReducer,
        creditInfoReducer:state.creditInfoReducer,
        toastReducer:state.toastReducer,
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
)(SeachCreditContainer);