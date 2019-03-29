import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from '../../../actions/AppActions';

import Tab from '../../../components/pages/helpCenter/tab/index'
import Btn from '../../../components/pages/helpCenter/btn/index'
import {get} from "../../../lib/fetch";
import serves from "../../../api";
import Bridge from "../../../lib/bridge"
import Spinner from "../../../components/common/Spinner";

class helpCenter extends Component {
    constructor(){
        super();
        this.state={
            tabData:[],
            Index:[],
        };
    }
    feedback(){
        Bridge.goFeedback();
    }
    componentDidMount(){
        const Index=1;
        this.getItem(Index);
    }
    getItem(Index){
        let $this=this;
        const { actions } = this.props;
        actions.doAction('SHOW_LOADING');
        get(serves.escrowHost + serves.getHelpCenter+"/"+Index,{
            body:''
        }).then(function(result) {
            actions.doAction('HIDE_LOADING');
            console.log(result.data);
            if(result.data){
                if(result.data.success===true){
                    $this.setState({tabData:result.data['data']});
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
                <div>
                    <Tab
                        itemData={this.state.tabData}
                        getItem={this.getItem.bind(this)}
                    />
                </div>
                <div>
                    <Btn
                        feedback={this.feedback.bind(this)}
                        Text={'HELPCENTER_BTN_TITLE'}
                    />
                </div>
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
)(helpCenter);