import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import name from 'classnames';
import style from './dateSlide.css';

import api from '../../../../api';
import {get} from '../../../../lib/fetch';
import utils from '../../../../lib/utils';

class DateSlider extends Component {
    state={
        b: this.props.nowDate,
        slideArr: [],
        dateType: 1
    }

    componentDidMount(){
        this._getTotleWeek();
    }

    componentWillReceiveProps(nextProps){
        // let nowDate = nextProps.nowDate;
        let dateType = nextProps.dateType;
        this.setState({
            b: nextProps.nowDate
        })
        if (this.state.dateType !== dateType) {
            if (dateType === 1) {
                this.setState({
                    dateType: dateType
                }, ()=>{
                    this._getTotleWeek();
                })
            }else if(dateType === 2){
                this.setState({
                    dateType: dateType
                }, ()=>{
                    this._creatTab(12);
                })
            }else{
                this.setState({
                    dateType: dateType
                }, ()=>{
                    this._creatTab(1);
                })
            }
        }
    }

    chooseDate(index){
        const { dateFn } = this.props;
        this.setState({
            b: index
        });
        dateFn(index)
    }

    _initScroll(){
        let inner = this.refs.inner;
        let out = this.refs.out;
        let count = inner.children.length;
        let wid = inner.children[0].clientWidth;
        inner.style.width = `${count * wid}px`;
        let x = (this.state.b - 4) < 0 ? 0 : (this.state.b - 4) * wid;
        if (out) {
            out.scrollTo(x, 0)
        }
    }

    _getTotleWeek(){
        const { actions } = this.props;
        let that = this;
        actions.doAction("SHOW_LOADING");
        const Year = utils.formatDate(new Date(),"y");
        get(api.escrowHost + api.getTotalWeek, {
            body: {
                currentYear: Year
            }
        }).then(
            (res)=>{
                actions.doAction("HIDE_LOADING")
                if (res.data && res.data.success) {
                    that._creatTab(res.data.data)
                }
            }
        )
    }
    _creatTab(totleDate){
        let slideArr = [];
        let len = totleDate || 0;
        for(let k = 0;k < len ; k++){
            slideArr.push(k+1)
        }
        this.setState({
            slideArr: slideArr
        }, ()=>{
            setTimeout(()=>{
                this._initScroll()
            },0)
        })

    }

    render() {
        let dateType = this.state.dateType;
        const Year = utils.formatDate(new Date(),"y");
        let msgId = "BOOKKEEP_SLIDER_WEEK";
        if ( dateType === 2 ) {
            msgId = "BOOKKEEP_SLIDER_MOUTH";
        }else if ( dateType === 3 ) {
            msgId = "BOOKKEEP_SLIDER_YEAR";
        }
        let heml = this.state.slideArr.map((val, i)=>{
            return(
                <p className={name([style.slide, this.state.b === val ? style.active : ""])} key={i} onClick={this.chooseDate.bind(this, val)}>
                    <FormattedMessage
                        id={msgId}
                        description="第{}周月年"
                        defaultMessage=""
                        values={{index: dateType === 3 ? Year : val}}
                        />
                   { this.state.b === val ? <i></i> : null}
                </p>
            )
        })
        return (
            <div className={style.wrap} ref="out">
                <div ref="inner" className={style.inner}>
                    {heml}
                </div>
            </div>
        );
    }
}

DateSlider.propTypes = {
    nowDate: PropTypes.number.isRequired,
    dateType: PropTypes.number.isRequired,
    dateFn: PropTypes.func.isRequired,

};

export default DateSlider;