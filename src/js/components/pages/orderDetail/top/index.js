import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './top.css';

import { FormattedMessage } from 'react-intl';

import Progress from './progress';
import utils from '../../../../lib/utils';
class Top extends Component {

    state = {
        isRefresh: false,
    }

    refresh(){
        const { actions, uccId } = this.props;
        const userId = utils.getUserLoginInfo() ? utils.getUserLoginInfo().id : null;
        this.setState({
            isRefresh: true
        })
        //发送更新接口
        actions.doAction('GET_BILL',{
            userId: userId,
            isProgress: true,
            queryBillType: 2,
            uccId: uccId
        })


    }

    render() {
        const { data, progressStatus } = this.props;
        let leftStatus = {
            id1: "ORDER_DETAIL_TOP_LEFT_1",
            id2: "ORDER_DETAIL_TOP_LEFT_3",
        }
        //状态 -1未出账 0 待还款， 1已还清， 2 部分还款 ，3 逾期未出账，4 逾期已出账 ,
        if (data&& data.status === -1) {
            leftStatus.id1 = "ORDER_DETAIL_TOP_LEFT_1-1";
            leftStatus.id2 = "ORDER_DETAIL_TOP_LEFT_3-1";
        } else if(data&& data.status === 3){
            leftStatus.id2 = "ORDER_DETAIL_TOP_LEFT_33";
        }
        let leftHtml = (<div className={style.boxL}>
                            <FormattedMessage
                                id={leftStatus.id1}
                                description="待还款金额"
                                defaultMessage=""
                                />
                            <p className={style.num}>{data.currentRepaymentMoney || "0,00"}</p>
                            <FormattedMessage
                                id={leftStatus.id2}
                                description="天数还款"
                                defaultMessage=""
                                values={
                                    {day: data.statusDay || ''}
                                }
                                />
                        </div>)
        let rightHtml = (<div className={style.boxR}>
                            <FormattedMessage
                                id="ORDER_DETAIL_TOP_RIGHT_1"
                                description="出账日"
                                defaultMessage=""
                                values={
                                    {time: data.stringOutAccountDate || ''}
                                }
                                />
                            <FormattedMessage
                                id="ORDER_DETAIL_TOP_RIGHT_2"
                                description="还款日"
                                defaultMessage=""
                                values={
                                    {time: data.stringRepaymentDate || ''}
                                }
                                />
                            <FormattedMessage
                                id="ORDER_DETAIL_TOP_RIGHT_3"
                                description="信用额度"
                                defaultMessage=""
                                values={
                                    {money: data.totalCreditAmount || ""}
                                }
                                />
                        </div>)


        return (
            <div className={style.wrap}>
                <div className={style.box}>
                    {leftHtml}
                    {rightHtml}
                </div>
                <div className={style.slide}>
                    <div>
                        <i className={style.iconBank}></i>
                        <p className={style.bankCard}>{data.creditCardNo || ''}</p>
                    </div>
                    {
                        !this.state.isRefresh ?
                        <div style={{width:"40%"}} onClick={this.refresh.bind(this)}>
                            <i className={style.refresh}></i>
                            <p className={style.refreshTxt}>Atualizar fatura</p>
                        </div>
                        :
                        <Progress
                            succ={ progressStatus }
                            />
                    }
                </div>
            </div>
        );
    }
}

Top.propTypes = {
    data: PropTypes.object.isRequired
};

export default Top;