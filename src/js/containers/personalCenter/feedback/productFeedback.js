import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../../../actions/AppActions';
import FeedbackTitle from '../../../components/pages/feedback/title/index';
import FeedbackCenter from '../../../components/pages/feedback/center/index'
import Toast from '../../../components/common/Toast/index';
import { post} from "../../../lib/fetch";
import Bridge from "../../../lib/bridge"
import utils from '../../../lib/utils';
import Spinner from "../../../components/common/Spinner/index";
import serves from "../../../api/index";

class ProductFeedback extends Component {
    constructor(){
        super();
        this.state = {
            Title: '',
            Center: ''
        };
    }
    SetInput(value){
        this.setState({
            Title: value,
        })
    }

    componentDidMount(){
        const { actions } = this.props;
        let that = this;
        Bridge.setTitleBarRight("submit");
        window['submit'] = function(){
            let data=that.state;
            if(!data.Title){
                actions.doAction('TOAST', 'Insira tópico de feedback');
                return;
            }
            if(!data.Center){
                actions.doAction('TOAST', 'Insira conteúdo de feedback');
                return;
            }
            actions.doAction('SHOW_LOADING');
            const userId = utils.getUserLoginInfo() ? utils.getUserLoginInfo().id : null;
            const email = utils.getUserLoginInfo() ? utils.getUserLoginInfo().email : null;
            post(serves.escrowHost + serves.feedback,{
                body:{
                    email:email,
                    opinionTheme:data.Title,
                    opinionContent:data.Center,
                    userId:userId

                }
            }).then(function(result) {
                console.log(result.data);
                actions.doAction('HIDE_LOADING');
                if(result.data){
                    if(result.data.success===true){
                        that.props.router.push('/FeedbackResult');
                        Bridge.removeSubmit();
                    }else{
                        actions.doAction('TOAST', result.data.message);
                    }
                }
            });
        }
    }
    SetTextarea(value){
        this.setState({
            Center: value,
        })
    }
    // submit(){
    //     let data=this.state;
    //     const { actions } = this.props;
    //     console.log(data);

    //     if(!data.Title){
    //         actions.doAction('TOAST', 'Insira tópico de feedback');
    //         return;
    //     }
    //     if(!data.Center){
    //         actions.doAction('TOAST', 'Insira conteúdo de feedback');
    //         return;
    //     }
    //     actions.doAction('SHOW_LOADING');
    //     const userId = utils.getUserLoginInfo() ? utils.getUserLoginInfo().id : null;
    //     const email = utils.getUserLoginInfo() ? utils.getUserLoginInfo().email : null;
    //     let $this=this;
    //     post(serves.escrowHost + serves.feedback,{
    //         body:{
    //             email:email,
    //             opinionTheme:data.Title,
    //             opinionContent:data.Center,
    //             userId:userId

    //         }
    //     }).then(function(result) {
    //         console.log(result.data);
    //         actions.doAction('HIDE_LOADING');
    //         if(result.data.success){
    //             $this.props.router.push('/FeedbackResult');
    //         }
    //     });

    // }

    render() {
        const { spinnerReducer, toastReducer } = this.props;
        const titleLength=30,CenterLength=200;
        return (
            <div style={ { paddingTop: '10px'} }>
                <FeedbackTitle
                    Type={'text'}
                    placeholder={'PRODUCTFEEDBACK_INPUT_TOPIC'}
                    length={titleLength}
                    fun={this.SetInput.bind(this)}
                />
                <FeedbackCenter
                    Type={'text'}
                    placeholder={'PRODUCTFEEDBACK_INPUT_CENTER'}
                    length={CenterLength}
                    fun={this.SetTextarea.bind(this)}
                />
                <Toast
                    list={toastReducer.list} />
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
)(ProductFeedback);