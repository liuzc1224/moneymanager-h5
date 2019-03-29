import React, { Component } from 'react';
import img from './images/right.png'
import style from './style.css'
import PropTypes from 'prop-types';

class msgList extends Component {
    constructor(){
        super();
        this.state = ({
            data: [],
            isLoadingMore: false,
            nextId:'',
            time:''
        });
    }
    getDails(item){
        this.props.getdails(item);
    }
    setCenter(text){
        if(text.length>65){
            return text.substring(0,65)+". . ."
        }else{
            return text;
        }
    }
    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let currentdate = strDate + seperator1 + month + seperator1 +year ;
        return currentdate;
    }
    loadMoreDataFn(){
        this.props.loadMoreDataFn();
    }
    render() {
        return (
            <div className={style.main}>
                <p className={style.time}>
                    {this.state.time}
                </p>
                {this.props.data.map((item, index) => (
                    <div className={style.Msg} onClick={this.getDails.bind(this,item)} key={index}>
                        <p className={style.Msg_title}>{item.title}</p>
                        <p className={style.Msg_time}>{item.sendTime}</p>
                        <div className={style.Msg_center + "  text"} dangerouslySetInnerHTML={{__html: this.setCenter(item.text)}}></div>
                        <div className={style.hr}></div>
                        <p className={style.bootom}>Ver detalhes</p>
                        <img src={img} style={{width:'12px'}} alt="" />
                    </div>
                ))}
                <div className={style.loadMore} ref="wrapper" onClick={this.loadMoreDataFn.bind(this)}></div>
            </div>
        );
    }

    componentDidMount() {
        const wrapper = this.refs.wrapper;
        const loadMoreDataFn = this.props.loadMoreDataFn;
        let timeCount;
        let time=this.getNowFormatDate();
        this.setState({
            time:time
        });
        this.props.getList();
        function callback() {
            const top = wrapper.getBoundingClientRect().top;
            const windowHeight = window.screen.height;

            if (top && top < windowHeight) {
                // 当 wrapper 已经被滚动到页面可视范围之内触发
                loadMoreDataFn();
            }
        }

        window.addEventListener('scroll', function () {
            if (this.state.isLoadingMore) {
                return ;
            }
            if (timeCount) {
                clearTimeout(timeCount);
            }
            timeCount = setTimeout(callback, 50);
        }.bind(this), false);
    }
}

msgList.propTypes = {
    getdails: PropTypes.func,
    getList:PropTypes.func,
    data:PropTypes.array,
    loadMoreDataFn:PropTypes.func,
};

export default msgList;