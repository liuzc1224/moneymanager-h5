import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as AppActions from '../../actions/AppActions';

import Spinner from './../../components/common/Spinner';
import Toast from './../../components/common/Toast';
import Alert from './../../components/common/Alert';

import Top from '../../components/pages/orderDetail/top';
import Item from '../../components/pages/orderDetail/item';
import Rpayment from '../../components/pages/orderDetail/repayment';
import SysPop from '../../components/pages/orderDetail/sysPop';

import { post, get } from '../../lib/fetch';
import api from '../../api';
import utils from '../../lib/utils';
import bridge from '../../lib/bridge';

class OrderDetailContainerContainer extends Component {

    state = {
        showRepayment: false,
        repaymentDate: null,
        showSysPop: false,
    }

    componentDidMount(){
        let that = this;
        bridge.setTitleBarRight('showPop');
        window['showPop'] = function(){
            that.setState({
                showSysPop: true
            })
        }
        this._getBill();

    }
    _getBill(){
        const { actions, router } = this.props;
        const userId = utils.getUserLoginInfo() ? utils.getUserLoginInfo().id : null;
        // actions.doAction('GET_ONECARD',{
        //     uccId: 218
        // })
        let uccId = router.params.uccId;
        actions.doAction('GET_BILL',{
            userId: userId,
            uccId: uccId,
            queryBillType: 2
        })
    }

    pay(item){
        this.setState({
            repaymentDate: item,
            showRepayment: true,
        })
    }

    handleClosePay(){
        this.setState({
            showRepayment: false
        })
    }
    handleSubmit(state){
        const { actions } = this.props;
        const userId = utils.getUserLoginInfo() ? utils.getUserLoginInfo().id : null;
        let item = this.state.repaymentDate;
        let that = this;
        let postData = {
            "creditorCardAccountBillID": item.id,
            "creditorCardAccountID": item.uccId,
            "repaymentAmount": state.money,
            "stageNumber": 1,
            "userID": userId,
            "accountType": state.payType,
        }
        actions.doAction('SHOW_LOADING');
        post(api.escrowHost + api.repayment,{
            body: postData
        }).then((res)=>{
            actions.doAction('HIDE_LOADING');
            that.setState({
                showRepayment: false
            })
            if (res.data.success) {
                that._getBill();
            }else{
                actions.doAction('TOAST', res.data.message)
            }
        })

    }

    deletCard(){
        const { actions } = this.props;
        let that = this;
        let yesHtml = <FormattedMessage
                            id="COMMON_DELET"
                            description="决定删除"
                            defaultMessage=""
                            />
        let noHtml = <FormattedMessage
                            id="COMMON_THINK"
                            description="我在想想"
                            defaultMessage=""
                            />
        let tipHtml = <FormattedMessage
                            id="COMMON_TIP"
                            description="提示"
                            defaultMessage=""
                            />
        let desHtml = <FormattedMessage
                            id="COMMON_DELET_TXT"
                            description="des"
                            defaultMessage=""
                            />
        actions.doAction('UPDATE_ALERT', {
            isShow: true,
            status: 'success',
            description: desHtml,
            title: tipHtml,
            actions: [
              { text: yesHtml, btnBg: true, cb: (argus) => {
                    that._deletFetch()
              } },
              { text: noHtml }
            ]
        })
        this.setState({
            showSysPop: false
        })
    }

    goToQusBack(){
        this.props.router.push('/productFeedback');
        this.setState({
            showSysPop: false
        });
    }
    _deletFetch(){
        const { actions, router} = this.props;
        let uccId = router.params.uccId;
        actions.doAction('SHOW_LOADING');
        get(api.escrowHost + api.delete + "/" + uccId,{
            body: {}
        }).then((res)=>{
            actions.doAction('HIDE_LOADING');
            if (res.data.success) {
               bridge.goBack();
            }else{
                actions.doAction('TOAST', res.data.message)
            }
        })

    }

    render() {
        const { spinnerReducer, toastReducer, billInfoReducer, alertReducer, progressReducer, actions, router } = this.props;
        let uccId = router.params.uccId;
        console.log(billInfoReducer.data);
        let listItem = billInfoReducer.data.map((item,i)=>{
                    return  (<Item
                                key={i}
                                data={item}
                                pay={this.pay.bind(this, item)}
                                />)
        })
        return (
            <div>
                <Top
                    data={billInfoReducer.data.length ? billInfoReducer.data[0] : {}}
                    actions={actions}
                    progressStatus={progressReducer.status}
                    uccId={uccId}
                    />
                {listItem}
                <Rpayment
                    data={this.state.repaymentDate}
                    bankName={billInfoReducer.data.length && billInfoReducer.data.bankName}
                    isShow={this.state.showRepayment}
                    close={this.handleClosePay.bind(this)}
                    submit={this.handleSubmit.bind(this)}
                    />
                <SysPop
                    handleDelet={this.deletCard.bind(this)}
                    handleGo={this.goToQusBack.bind(this)}
                    isShow={this.state.showSysPop}
                    />
                <Spinner
                    showLoading={spinnerReducer.showLoading}
                    showDropback={spinnerReducer.showDropback}
                    />
                <Alert
                    doAction={actions.doAction}
                    isShow={alertReducer.isShow}
                    title={alertReducer.title}
                    description={alertReducer.description}
                    actions={alertReducer.actions}
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
        toastReducer: state.toastReducer,
        billInfoReducer: state.billInfoReducer,
        progressReducer: state.progressReducer,
        alertReducer:state.alertReducer,
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
)(OrderDetailContainerContainer);