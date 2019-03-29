import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './repayment.css';
import name from 'classnames';

import { FormattedMessage } from 'react-intl';

class Repayment extends Component {

    state = {
        payType: 1,
        money: ""
    }

    changeBottom(bottom){
        let dom = this.refs.box;
        if (!dom) {
            return false;
        }
        setTimeout(() => {
            dom.style.bottom = `${bottom}rem`;
        }, 0);
    }

    handleChange(e){
        let val = this.refs.payType.value;
        console.log(e.target.value);
        this.setState({
            payType: val
        })
    }
    handleMoney(){
        let val = this.refs.money.value;
        this.setState({
            money: val
        })
    }
    handleAllRepay(e){
        const { data } = this.props;
        let dom = this.refs.allMoney;
        let allMoney = (data && data.currentRepaymentMoney) || 0;
        this.setState({
            money: allMoney
        })
        dom.style.background = "rgba(252,117,88,1)"
    }
    handleClose(){
        const { close } = this.props;
        let dom = this.refs.allMoney;
        dom.style.background = "rgba(190,190,190,1)"
        this.setState({
            money: ""
        })
        close()
    }
    handleSubmit(){
        const { submit } = this.props;
        submit(this.state)
    }
    render() {
        const { isShow, data } = this.props;
        if (isShow) {
            this.changeBottom(0)
        }else{
            this.changeBottom(-5.9)
        }
        return (
            <div className={style.wrap}>
                {isShow?<div className='common-mask'></div>:null}
                <div ref="box" className={(style.box)} style={{ display: isShow ? 'block' : 'none' }}>
                    <p className={style.cancel} onClick={this.handleClose.bind(this)}>
                        <FormattedMessage
                            id="COMMON_CANCEL"
                            description='取消'
                            defaultMessage=''
                        />
                    </p>
                    <div className={style.title}>
                        {data && data.bankName} {data && data.creditCardNo} {(data && data.overDueStatus) ? <span className={style.overDie}>
                                <FormattedMessage
                                    id="COMMON_STATUS_OVERDIE"
                                    description="含逾期"
                                    defaultMessage=""
                                    tagName="i"
                                    />
                            </span>
                            : null}
                    </div>
                    <p className={style.list}>
                        <FormattedMessage
                            id="ORDER_DETAIL_REPAYMENT_LIST_TIME"
                            description='账单日期'
                            defaultMessage=''
                        />
                        <span style={{color:"#aaa"}}>{data && data.outAccountDateMonthStr}</span>
                    </p>
                    <p className={style.list}>
                        <FormattedMessage
                            id="ORDER_DETAIL_REPAYMENT_LIST_MONEY"
                            description='账单金额'
                            defaultMessage=''
                        />
                        <span style={{fontSize:".44rem"}}>{data && data.currentRepaymentMoney}</span>
                    </p>
                    <p className={name([style.list, style.affter])}>
                        <FormattedMessage
                            id="ORDER_DETAIL_REPAYMENT_LIST_TYPE"
                            description='还款方式'
                            defaultMessage=''
                        />
                        <select className={style.payType} ref="payType" value={this.state.payType} onChange={this.handleChange.bind(this)}>
                            {/* <FormattedMessage
                                id="ORDER_DETAIL_REPAYMENT_LIST_PAYTYPE1"
                                description='银行卡'
                                defaultMessage=''
                                tagName="option"
                                value="1"
                            />
                            <FormattedMessage
                                id="ORDER_DETAIL_REPAYMENT_LIST_PAYTYPE2"
                                description='现金'
                                defaultMessage=''
                                tagName="option"
                                value="2"
                            /> */}
                            <option value="1">Cartão bancário</option>
                            <option value="2">Dinheiro à vista</option>
                        </select>
                    </p>
                    <p className={style.inpList}>
                            <FormattedMessage
                                id="ORDER_DETAIL_REPAYMENT_LIST_REPAYMONER"
                                description='银行卡'
                                defaultMessage=''
                            />
                            <input className={style.inp} ref="money" type="text" value={this.state.money} onChange={this.handleMoney.bind(this)}/>
                            <span className={style.paidOff} ref="allMoney" onClick={this.handleAllRepay.bind(this)}>
                                <FormattedMessage
                                    id="COMMON_PAID_OFF"
                                    description='已还清'
                                    defaultMessage=''
                                    tagName='i'
                                />
                            </span>
                    </p>
                    <button className={style.btn} disabled={(!this.state.money && !(this.state.money===0))} onClick={this.handleSubmit.bind(this)}>
                        <FormattedMessage
                            id="COMMON_OK"
                            description='ok'
                            defaultMessage=''
                        />
                    </button>
                </div>
            </div>
        );
    }
}

Repayment.propTypes = {
    submit: PropTypes.func.isRequired,
    close:  PropTypes.func.isRequired,
    isShow: PropTypes.bool,
    data: PropTypes.object,
};

export default Repayment;