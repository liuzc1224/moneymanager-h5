import React, { Component } from 'react';
import ListCanter from '../../components/pages/Message/MsgList'
import {get} from "../../lib/fetch";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import serves from "../../api";
import Spinner from "../../components/common/Spinner";
import * as AppActions from "../../actions/AppActions";

class MsgList extends Component {
    constructor(){
        super();
        this.state = ({
            data: [],
            nextId:'',
            time:''
        });
    }
    details(item){
        this.props.router.push({pathname:'/msgDetails',state: {data: item}});
    }
    getList(){
        let that=this;

        const { actions } = this.props;
        actions.doAction('SHOW_LOADING');
        get(serves.escrowHost + serves.getMsg,{
            body:{
                nextId:'',
                limit:5
            }
        }).then(function(result) {
            actions.doAction('HIDE_LOADING');
            console.log(result.data);
            // actions.doAction('HIDE_LOADING');
            if(result.data.success===true){
                that.setState({
                    data:result.data.data.appPushHistoryOutputBOList,
                    nextId:result.data.data.nextId,
                });
                console.log(that.state.data)
            }else{
                actions.doAction('TOAST', result.data.message);
            }
        });
    }
    loadMoreDataFn(){
        let that=this;
        const { actions } = this.props;
        get(serves.escrowHost + serves.getMsg,{
            body:{
                nextId:that.state.nextId,
                limit:5
            }
        }).then(function(result) {
            actions.doAction('HIDE_LOADING');
            console.log(result.data);
            if(result.data){
                if(result.data.success===true){
                    that.setState({
                        data:that.state.data.concat(result.data.data.appPushHistoryOutputBOList),
                        nextId:result.data.data.nextId
                    });
                    console.log(that.state.data)
                }else{
                    actions.doAction('TOAST', result.data.message);
                }
            }
        });
    }
    render() {
        const { spinnerReducer } = this.props;
        return (
            <div>
                <ListCanter
                    data={this.state.data}
                    getList={this.getList.bind(this)}
                    getdails={this.details.bind(this)}
                    loadMoreDataFn={this.loadMoreDataFn.bind(this)}
                />
                <Spinner
                    showLoading={spinnerReducer.showLoading}
                    showDropback={spinnerReducer.showDropback} />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        spinnerReducer:state.spinnerReducer,
        toastReducer: state.toastReducer,
        checkMobileReducer: state.checkMobileReducer,
        codeReducer: state.codeReducer
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
)(MsgList);
