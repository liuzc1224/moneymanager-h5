import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import style from './charts.css';

import utils from '../../../../lib/utils';

import Wall from '../../../common/Wall';
import Item from './item';

class Charts extends Component {

    _calculateRate(val){
        const { MAX } = this.props;
        if (!val) {
            return{}
        }
        let per = (val / MAX) * 300 /100;
        return {
            height: `${per}rem`,
            background: '#FC7558'
        }
    }

    render() {
        //headerStatus 1 支出 2 收入
        const { slideArr, dateType, headerStatus, totleMoney, sortList } = this.props;
        let sortHtml = sortList.map((k, i)=>{
            return (
                <Item
                    key={i}
                    data={k}/>
            )
        })

        let heml = slideArr.map((item, i)=>{
            if (dateType === 1) {
                return(
                    <p className={style.slider} key={i}>
                        <span style={this._calculateRate(item.val)}></span>
                        <i>{item.date}</i>
                    </p>
                )
            }else if(dateType === 3){
                return(
                    <p className={style.slider} key={i}>
                        <span style={this._calculateRate(item.val)}></span>
                        <i>{item.date}</i>
                    </p>
                )
            }
            return(
                <p className={style.slider} key={i}>
                    <span style={this._calculateRate(item.val)}></span>
                    {(i+1) % 5 === 0 || i === 0 ? <i>{i + 1}</i> : <i>&nbsp;</i>}
                </p>
            )
        })
        return (
            <div className={style.wrap}>
                <p className={style.totle}>
                    {headerStatus === 1 ?
                    <FormattedMessage
                        id="BOOKKEEP_CHARTS_TOTLE"
                        description=""
                        defaultMessage=""
                        values={{money: utils.money(totleMoney)}}
                        />
                        :
                    <FormattedMessage
                        id="BOOKKEEP_CHARTS_TOTLE_INCOME"
                        description=""
                        defaultMessage=""
                        values={{money: utils.money(totleMoney)}}
                        />}
                </p>
                <div className={style.box}>
                    {heml}
                </div>
                <Wall
                    styleObj={{background: "#F5F5F5",borderTop:"1px solid #E0E0E0", borderBottom:"1px solid #E0E0E0"}}
                    height={20}
                    />
                <div className={style.list}>
                    <p className={style.title}>
                        {headerStatus === 1 ?
                        <FormattedMessage
                            id="BOOKKEEP_EXPENDITURE_RANK"
                            description="支出排行"
                            defaultMessage=""
                            />:
                        <FormattedMessage
                            id="BOOKKEEP_INCOME_RANK"
                            description="收入排行"
                            defaultMessage=""
                            />}
                    </p>
                    {
                    sortList.length ?
                        sortHtml
                        :
                        <div className={style.empty}>
                            <div className={style.centerBox}>
                                <p className={style.emptyBg}></p>
                                <FormattedMessage
                                    id="BOOKKEEP_EMPTYTIP"
                                    description=""
                                    defaultMessage=""
                                    />
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

Charts.propTypes = {
    slideArr: PropTypes.array.isRequired,
    totleMoney: PropTypes.string.isRequired,
    dateType: PropTypes.number.isRequired,
    headerStatus: PropTypes.number.isRequired,
    sortList: PropTypes.array.isRequired,
    MAX: PropTypes.number.isRequired,
};

export default Charts;