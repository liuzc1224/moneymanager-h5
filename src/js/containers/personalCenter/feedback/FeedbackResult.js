import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../../../actions/AppActions';
import Img from '../../../components/pages/FeedbackResult/bnner/index';
import Btn from '../../../components/pages/FeedbackResult/btn/index'
import Text from '../../../components/pages/FeedbackResult/text/index'
import bridge from "../../../lib/bridge"
import Spinner from "../../../components/common/Spinner/index";

class ProductFeedback extends Component {
    state = {
        Title: '',
        Center: ''
    };
    MyCenter(){//返回个人中心
        bridge.goMyCenter();
    }
    submit(){
        let data=this.state;
        console.log(data)
    }
    render() {
        const { spinnerReducer } = this.props;
        const height=window.screen.height;
        return (
            <div style={{height:height,background:'#ffffff',paddingTop:'10px'}}>
                <Img
                    Text={'PRODUCTFEEDBACK_SUCCESS'}
                />
                <Text
                    Text={'PRODUCTFEEDBACK_CENTER'}
                />
                <Btn
                    jump={this.MyCenter.bind(this)}
                    Text={'PRODUCTFEEDBACK_BACK_PERSONAL_CENTER'}
                />
                <Spinner
                    showLoading={spinnerReducer.showLoading}
                    showDropback={spinnerReducer.showDropback}
                    type={'load8'}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        spinnerReducer:state.spinnerReducer,
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
)(ProductFeedback);