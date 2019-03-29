import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import name from 'classnames';

import style from './item.css';

import Wall from '../../../common/Wall';

class Item extends Component {
    render() {
        //状态 -1未出账 0 待还款， 1已还清， 2 部分还款 ，3 逾期未出账，4 逾期已出账 ,
        const { pay, data } = this.props;
        let statusHtml
        if (data.status === 0 || data.status === 2) {
            //立即还款
            statusHtml = (<p className={style.btn} onClick={pay}>
                            <FormattedMessage
                                id="COMMON_STATUS_PAY"
                                description="立即还款"
                                defaultMessage=""
                                />
                        </p>)
        }else if(data.status === 1){
            //已还款
            statusHtml = <FormattedMessage
                            id="COMMON_STATUS_REPAY"
                            description="已还"
                            defaultMessage=""
                            />
        }else if(data.status === 3){
            //未还款
            statusHtml = <FormattedMessage
                            id="COMMON_STATUS_NOPAY"
                            description="未还"
                            defaultMessage=""
                            />
        }else if(data.status === -1){
            //未出账
            statusHtml = <FormattedMessage
                            id="COMMON_STATUS_NOOUT"
                            description="未出账"
                            defaultMessage=""
                            />
        }
        return (
            <div>
                <Wall/>
                <div className={style.wrap}>
                    <p className={style.flrstP}>
                        <FormattedMessage
                            id="ORDER_DETAIL_ITEM_TIME"
                            description="账单每月"
                            defaultMessage=""
                            values={
                                {time:data.outAccountDateMonthStr}
                            }
                            />
                            {data.overDueStatus ? <span className={style.overDie}>
                                <FormattedMessage
                                    id="COMMON_STATUS_OVERDIE"
                                    description="含逾期"
                                    defaultMessage=""
                                    tagName="i"
                                    />
                            </span>
                            : null}
                    </p>
                    <p className={style.pCenter}>
                        <FormattedMessage
                            id="ORDER_DETAIL_ITEM_PAY"
                            description="出账金额"
                            defaultMessage=""
                            values={
                                {money:<i style={{paddingRight:"0.28rem",color:"#585858",fontWeight:"bold",fontSize:"0.34rem"}}>{ data.status === -1 ? "--" : (data.outAccountMoney || "0,00")}</i>}
                            }
                            />
                    </p>
                    <p>
                        <FormattedMessage
                            id="ORDER_DETAIL_ITEM_REPAY"
                            description="已还款"
                            defaultMessage=""
                            values={
                                {money:<i style={{paddingRight:"0.82rem",color:"#aaa",fontSize:"0.28rem"}}>{data.repaymentMoney || "0,00"}</i>}
                            }
                            />
                    </p>
                    <div className={name([style.btnBox, { "item-btnBoxRed": status === 3}])}>
                        {statusHtml}
                    </div>
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    data: PropTypes.object.isRequired
};

export default Item;