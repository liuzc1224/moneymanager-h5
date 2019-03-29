import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CSSTransition } from'react-transition-group';
import * as AppActions from '../../actions/AppActions';

import Spinner from './../../components/common/Spinner';
import Toast from './../../components/common/Toast';

import Header from '../../components/pages/bookkeep/header';
import Tabs from '../../components/pages/bookkeep/tabs';
import DateSlide from '../../components/pages/bookkeep/dateSlide';
import Charts from '../../components/pages/bookkeep/charts';

import utils from '../../lib/utils';
import { get } from '../../lib/fetch';
import api from '../../api';
import bridge from '../../lib/bridge';

class BookkeepContainerContainer extends Component {
    state={
        headerStatus : 1,
        dateType : 1,
        dateIndex : 1,
        totleDate : 1,
        sort: [],
        tranStauts: true
    }

    componentDidMount(){
        this._getWeek();
    }

    changeHeader(index){
        if (index === this.state.headerStatus) {
            return false;
        }
        //选择 收入  支出
        this.setState({
            headerStatus : index,
            dateType : 1,
            dateIndex: 1,
            totleDate: 1,
            tranStauts: !this.state.tranStauts
        },()=>{
            this._getWeek();
        })
    }

    changeTabs(index){
        if (index === this.state.dateType) {
            return false;
        }
        //选择周 月 年
        const mouth = utils.formatDate(new Date(),"M");
        let dateIndex = 1;
        if (index === 2) {
            dateIndex =  Number(mouth)
        }else if (index === 1){
            this.setState({
                dateType : index,
                dateIndex : dateIndex,
                tranStauts: !this.state.tranStauts
            })
            this._getWeek();
            return false;
        }
        this.setState({
            dateType : index,
            dateIndex: dateIndex,
            tranStauts: !this.state.tranStauts
        }, ()=>{
            this._getCharts()
        })
    }
    //返回
    goBack(){
        bridge.goBack();
    }

    //获取选择的时间数作为查询条件
    getDateIndex(dateIndex){
        if (dateIndex === this.state.dateIndex) {
            return false;
        }
        //选择具体时间
        this.setState({
            dateIndex : dateIndex,
            tranStauts: !this.state.tranStauts
        }, ()=>{
            this._getCharts()
        })

    }

    //查询当前日期是第几周
    _getWeek(){
        const { actions } = this.props;
        let that = this;
        actions.doAction("SHOW_LOADING")
        get(api.escrowHost + api.getWeek, {
            body: {}
        }).then(
            (res)=>{
                actions.doAction("HIDE_LOADING")
                if (res.data && res.data.success) {
                    that.setState({
                        dateIndex: res.data.data
                    }, ()=>{
                        that._getCharts()
                    })

                }
            }
        )
    }

    _getCharts(isFirst){
        const { actions } = this.props;
        const userId = utils.getUserLoginInfo() ? utils.getUserLoginInfo().id : null;
        //dateType 时间单位:0日 1周 2月 3年  paymentType   收支类型 ,
        if (isFirst) {
            const day = utils.formatDate(new Date(),"yMd");
            const mouth = utils.formatDate(new Date(),"M");
            let Year = utils.formatDate(new Date(),"y");
            let searchModule = {
                "currentDate": day,
                "currentMonth": mouth,
                "currentWeek": this.state.dateIndex,
                "currentYear": Year,
                "dateType": this.state.dateType,
                "paymentType": this.state.headerStatus,
                "userId": userId
            }
            actions.doAction('GET_CHARTS', searchModule);
            return false;
        }
        let Year = utils.formatDate(new Date(),"y");
        let searchModule = {
            "currentDate": this.state.dateIndex,
            "currentMonth": this.state.dateIndex,
            "currentWeek": this.state.dateIndex,
            "currentYear": Year,
            "dateType": this.state.dateType,
            "paymentType": this.state.headerStatus,
            "userId": userId
        }
        actions.doAction('GET_CHARTS', searchModule);
        this._getSort()
    }

    _getSort(){
        const { actions } = this.props;
        const userId = utils.getUserLoginInfo() ? utils.getUserLoginInfo().id : null;
        const day = utils.formatDate(new Date(),"yMd");
        const mouth = utils.formatDate(new Date(),"y") + this.state.dateIndex;
        const Year = utils.formatDate(new Date(),"y");
        let searchModule = {
            "currentDate": day,
            "currentMonth": mouth,
            "currentWeek": this.state.dateIndex,
            "currentYear": Year,
            "dateType": this.state.dateType,
            "paymentType": this.state.headerStatus,
            "userId": userId
        }
        let that = this;
        actions.doAction("SHOW_LOADING")
        get(api.escrowHost + api.getSort, {
            body: searchModule
        }).then(
            (res)=>{
                actions.doAction("HIDE_LOADING")
                if (res.data && res.data.success) {
                    that.setState({
                        sort: res.data.data
                    })

                }
            }
        )
    }

    _objToArr(obj){
        let dateArr = [];
        let totleMoney = 0;
        Object.keys(obj).forEach( key => {
            if (obj[key]) {
                totleMoney += obj[key]
            }
            dateArr.push({
                date: key,
                val: obj[key] ? obj[key] : 0,
            })
        })
        let max = 0
        max = this._max(dateArr)
        return {
            totleMoney: totleMoney.toFixed(2),
            dateArr: dateArr,
            max: max
        };
    }

    _max(arr){
        if (!arr.length) {
            return 0;
        }
        let max = arr[0]['val'];
        let len = arr.length;
        for (let i = 1; i < len; i++){
            if (arr[i]['val'] > max) {
            max = arr[i]['val'];
            }
        }
        return max;
    }

    render() {
        const { spinnerReducer, toastReducer, chartInfoReducer, actions } = this.props;
        const toArr = this._objToArr(chartInfoReducer.data)
        return (
            <div>
                <Header
                    headerStatus={this.state.headerStatus}
                    tabFn={this.changeHeader.bind(this)}
                    goBack={this.goBack.bind(this)}
                    />
                <Tabs
                    dateType={this.state.dateType}
                    tabFn={this.changeTabs.bind(this)}/>
                <DateSlide
                    dateFn={this.getDateIndex.bind(this)}
                    nowDate={this.state.dateIndex}
                    dateType={this.state.dateType}
                    actions={actions}
                    />
                <CSSTransition
                    in={this.state.tranStauts}
                    timeout={200}
                    classNames="message"
                    unmountOnExit
                    >
                    <Charts
                        slideArr={toArr.dateArr}
                        totleMoney={toArr.totleMoney}
                        dateType={this.state.dateType}
                        headerStatus={this.state.headerStatus}
                        sortList={this.state.sort}
                        MAX={toArr.max}
                        />
                </CSSTransition>
                <CSSTransition
                    in={!this.state.tranStauts}
                    timeout={200}
                    classNames="message2"
                    unmountOnExit
                    >
                    <Charts
                        slideArr={toArr.dateArr}
                        totleMoney={toArr.totleMoney}
                        dateType={this.state.dateType}
                        headerStatus={this.state.headerStatus}
                        sortList={this.state.sort}
                        MAX={toArr.max}
                        />
                </CSSTransition>
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
        chartInfoReducer: state.chartInfoReducer,
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
)(BookkeepContainerContainer);